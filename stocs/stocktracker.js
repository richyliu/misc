/* global Highcharts */


class singleTimeslotStockTracker {
    constructor(amount, ticker, time) {
        this.time = time || new Date();
        this.amount = amount;
        this.ticker = ticker;
    }
    
    getDate() {
        return this.time;
    }
    
    getAmount() {
        return this.amount;
    }
    
    getTicker() {
        return this.ticker;
    }
}



class multipleTimeslotStockTracker {
    constructor(ticker) {
        this.ticker = ticker;
        this.totalStock = [];
    }
    
    getTotalStock() {
        return this.totalStock;
    }
    
    buyStock(amount) {
        this.totalStock.push(new singleTimeslotStockTracker(amount, this.ticker, new Date()));
    }
    
    sellStock(amount) {
        var amountNeedToSell = amount;
        var soldStocks = [];
        
        for (var i = 0; i < this.totalStock.length; i++) {
            if (!this.totalStock[i].amount) {
                continue;
            }
            if (amountNeedToSell < this.totalStock[i].getAmount()) {
                var swap = new singleTimeslotStockTracker(
                    this.totalStock[i].getAmount() - amountNeedToSell,
                    this.ticker,
                    this.totalStock[i].getDate()
                );
                this.totalStock[i] = swap;
                
                soldStocks.push(new singleTimeslotStockTracker(amountNeedToSell, this.totalStock[i].getDate()));
                break;
            }
            soldStocks.push(new singleTimeslotStockTracker(this.totalStock[i].getAmount(), this.totalStock[i].getDate()));
            amountNeedToSell -= this.totalStock[i].getAmount();
            this.totalStock[i] = null;
        }
        if (amountNeedToSell > 0) {
            throw new Error('Not enough existing stocks to make sale!');
        }
        
        return soldStocks;
    }
}



class StockTracker extends singleTimeslotStockTracker{
    constructor(amount, ticker, time) {
        super(amount, ticker, time);

        this.util = new Util();
    }


    getStockAmountEarned(callback) {
        var self = this;
        this.getCurrentStockTotal(function(total) {
            self.getInitialStockTotal(function(oldTotal) {
                callback(total - oldTotal);
            });
        });
    }


    getCurrentStockTotal(callback) {
        this.getStockPrice(new Date(), this.ticker, Util.TYPES().CLOSE, (function(amount, callback) {
            return function(price) {
                callback(amount * price);
            };
        }(this.amount, callback || function() {})));
    }


    getInitialStockTotal(callback) {
        this.getStockPrice(this.time, this.ticker, Util.TYPES().CLOSE, (function(amount, callback) {
            return function(price) {
                callback(amount * price);
            };
        }(this.amount, callback || function() {})));
    }


    getStockPrice(time, ticker, type, callback) {
        // http://stackoverflow.com/questions/754593/source-of-historical-stock-data#answer-2152127

        // adjust time so that conversion to utc becomes correct and subtract 1 day
        time = new Date(time.getTime() - time.getTimezoneOffset() * 60000 - 24 * 60 * 60 * 1000);

        Util.getStockPriceFromTimeRange(time, time, ticker, type, function(resp) {
            callback(resp[0]);
        });
    }
}




class Portfolio {
    constructor(startingMoney) {
        this.stockTrackers = [];
        this.money = startingMoney;
    }
    
    
    addStockTracker(stockTracker) {
        if (stockTracker instanceof StockTracker) {
            this.stockTrackers.push(stockTracker);
        }
    }
    
    
    getTotalStockMoney() {
        var totalStockMoney = 0;
        for (var i = 0; i < this.stockTrackers.length; i++) {
            this.stockTrackers[i].getCurrentStockTotal(function(money) {
                totalStockMoney += money;
            });
        }
        
        return totalStockMoney;
    }
    
    
    getTotalStockProfit() {
        var totalStockProfit = 0;
        for (var i = 0; i < this.stockTrackers.length; i++) {
            this.stockTrackers[i].getStockAmountEarned(function(money) {
                totalStockProfit += money;
            });
        }
        
        return totalStockProfit;
    }
}




class Util {
    static TYPES() {
        return {
            OPEN: 'Open',
            HIGH: 'High',
            LOW: 'Low',
            CLOSE: 'Close'
        };
    }
    
    
    static gettickerFromName(stockName, callback) {
        // http://stackoverflow.com/questions/885456/stock-ticker-symbol-lookup-api
        // http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=toyota&region=1&lang=en&callback=main


    }


    static getStockPriceFromTimeRange(begin, end, ticker, type, callback) {
        this.jsonp('http://query.yahooapis.com/v1/public/yql?' +
            'q=' +
            encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' +
                ticker +
                '") and endDate = "' +
                end.toISOString().slice(0, 10) +
                '" and startDate = "' +
                begin.toISOString().slice(0, 10) +
                '"') +
            "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json",
            function(resp) {
                // console.log(resp);
                if (Array.isArray(resp.query.results.quote)) {
                    var quotes = resp.query.results.quote;

                    var data = [];
                    for (var i = 0; i < quotes.length; i++) {
                        data.push(quotes[i][type]);
                    }
                    
                    callback(data, resp);
                } else {
                    callback([resp.query.results.quote[type]], resp);
                }
            }
        );
    }


    static jsonp(url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    }
    
    
    static getStockPriceAndTimestamp(begin, end, ticker, type, callback) {
        this.getStockPriceFromTimeRange(begin, end, ticker, type, function(data, rawResp) {
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                newData.push([new Date(rawResp.query.results.quote[i].Date).getTime(), parseFloat(data[i])]);
            }
            
            callback(newData.reverse());
        });
    }
    
    
    static drawChart(startDate, endDate, ticker, type) {
        this.getStockPriceAndTimestamp(startDate, endDate, ticker, type, function(data) {
            // console.log(data);
            
            
            new Highcharts.StockChart({
                chart: {
                    renderTo: 'graph'
                },
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: ticker + ' Stock Price'
                },
                series: [{
                    name: ticker,
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
        });
    }
}