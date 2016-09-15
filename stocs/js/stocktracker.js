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
    
    
    
    getTicker() {
        return this.ticker;
    }
    
    
    
    getTotal() {
        return this.totalStock;
    }
    
    
    
    buy(amount, date, callback = function() {}) {
        this.totalStock.push(new singleTimeslotStockTracker(amount, this.ticker, date || new Date()));
        
        // how much stock costs
        Util.getStockPriceFromTimestamp(date, this.ticker, function(price) {
            callback(amount * price);
        });
    }
    
    
    
    sell(amount, date, callback = function() {}) {
        // if no date
        if (typeof date === 'function') {
            callback = date;
            date = new Date();
        }
        var amountNeedToSell = amount;
        var soldStocks = [];
        
        for (var i = 0; i < this.totalStock.length; i++) {
            if (!this.totalStock[i].amount) {
                continue;
            }
            if (amountNeedToSell < this.totalStock[i].getAmount()) {
                // subtract amountNeedToSell from the first totalStock
                var swap = new singleTimeslotStockTracker(
                    this.totalStock[i].getAmount() - amountNeedToSell,
                    this.ticker,
                    this.totalStock[i].getDate()
                );
                this.totalStock[i] = swap;
                
                soldStocks.push(new singleTimeslotStockTracker(amountNeedToSell, this.ticker, this.totalStock[i].getDate()));
                // sold all that needs to be sold
                amountNeedToSell = 0
                break;
            }
            // if need more than one singeTimeslotStockTracker
            soldStocks.push(new singleTimeslotStockTracker(this.totalStock[i].getAmount(), this.ticker, this.totalStock[i].getDate()));
            // deduct amountNeedToSell from amount already sold
            amountNeedToSell -= this.totalStock[i].getAmount();
            // proceed to next totalStock
            this.totalStock[i] = null;
        }
        if (amountNeedToSell > 0) {
            throw new Error('Not enough existing stocks to make sale!');
        }
        
        
        var profit = 0;
        var soldStocksCalculated = new Array(soldStocks.length).fill(false);
        var self = this;
        
        // loop through all soldStocks to calculate profit
        for (var i = 0; i < soldStocks.length; i++) {
            // wrap in iife in order for soldStock[i].getAmount() to be used
            Util.getStockPriceFromTimestamp(soldStocks[i].getDate(), this.ticker, (function(currentSoldStockAmount, i) {
                return function(pastPrice) {
                    // use self bc "this" referes to the function() {} scope
                    Util.getStockPriceFromTimestamp(date, self.ticker, (function(currentSoldStockAmount, i) {
                        return function(curPrice) {
                            profit += (curPrice - pastPrice) * currentSoldStockAmount;
                            soldStocksCalculated[i] = true;
                            
                            for (var j = 0; j < soldStocksCalculated.length; j++) {
                                if (!soldStocksCalculated[j]) return;
                            }
                            
                            // all soldStocks calculated
                            callback(profit);
                        };
                    }(currentSoldStockAmount, i)));
                };
            }(soldStocks[i].getAmount(), i)));
        }
        
    }
}




class StockTracker extends singleTimeslotStockTracker{
    constructor(amount, ticker, time) {
        super(amount, ticker, time);

        this.util = new Util();
    }



    getStockAmountEarned(callback = function() {}) {
        var self = this;
        this.getCurrentStockTotal(function(total) {
            self.getInitialStockTotal(function(oldTotal) {
                callback(total - oldTotal);
            });
        });
    }



    getCurrentStockTotal(callback = function() {}) {
        this.getStockPrice(new Date(), this.ticker, Util.TYPES().CLOSE, (function(amount, callback) {
            return function(price) {
                callback(amount * price);
            };
        }(this.amount, callback)));
    }



    getInitialStockTotal(callback = function() {}) {
        this.getStockPrice(this.time, this.ticker, Util.TYPES().CLOSE, (function(amount, callback) {
            return function(price) {
                callback(amount * price);
            };
        }(this.amount, callback)));
    }



    getStockPrice(time, ticker, type, callback = function() {}) {
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
    
    
    
    // WIP
    static getTickerFromName(stockName, callback = function() {}) {
        PreUtil.runOnceTickerCsvLoaded(function() {
            var allCsv = PreUtil.getTickerCsv();
            
            for (var i = 0; i < allCsv.length; i++) {
                if (allCsv[i][1].toLowerCase().indexOf(stockName.toLowerCase()) > -1) {
                    console.log(allCsv[i]);
                }
            }
        });
    }



    static getStockPriceFromTimeRange(begin, end, ticker, type, callback = function() {}) {
        // http://stackoverflow.com/questions/885456/stock-ticker-symbol-lookup-api
        // http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=toyota&region=1&lang=en&callback=main
        jsonp('http://query.yahooapis.com/v1/public/yql?' +
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
                if (!resp.query.results) throw new Error('No entry found for date range ' + begin.toDateString() + ' to ' + end.toDateString());
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
        
        
        function jsonp(url, callback = function() {}) {
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
    }
    
    
    
    static getStockPriceAndTimestamp(begin, end, ticker, type, callback = function() {}) {
        this.getStockPriceFromTimeRange(begin, end, ticker, type, function(data, rawResp) {
            // array of 2 elements within array
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                // element 0 is the timestamp, and element 1 is the data
                newData.push([new Date(rawResp.query.results.quote[i].Date).getTime(), parseFloat(data[i])]);
            }
            
            callback(newData.reverse());
        });
    }
    
    
    
    static getStockPriceFromTimestamp(time, ticker, type, callback = function() {}) {
        if (this.isMarketClosed(time)) throw new Error('Market is not open on ' + time.toDateString());
        // if no type, shift arguments and default type to 'close'
        if (typeof type === 'function') {
            callback = type;
            type = this.TYPES().CLOSE;
        }
        
        this.getStockPriceFromTimeRange(time, time, ticker, type, function(data) {
            // return the price of the stock
            callback(data[0]);
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
    
    
    
    static XMLHttpRequest(url, callback = function() {}) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        
        request.onload = function() {
            if (request.status == 200 && request.readyState === 4) {
                callback(request.responseText);
            }
        };
        
        request.send();
    }



    static isMarketClosed(date) {
        // saturday (6) or sunday (0)
        return date.getDate() % 6 === 0;
    }
    
    
    
    static sleep(miliseconds) {
         var currentTime = new Date().getTime();
    
         while (currentTime + miliseconds >= new Date().getTime()) {}
     }
    
    
    
    static printStackTrace() {
        console.log((new Error()).stack);
    }
}




class PreUtil {
    static loadAll () {
        this.loadTickerCsv();
        this.allTickerCsvLoaded = false;
    }
    
    
    
    static loadTickerCsv() {
        // http://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=NASDAQ&render=download
        // http://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=NYSE&render=download
        
        
        Util.XMLHttpRequest('all.csv', (function(self) {
            return function(allText) {
                var allTextLines = allText.split(/\r\n|\n/);
                var headers = allTextLines[0]
                        .slice(1, -2)           // remove leading " and trailing ",
                        .split('","');          // split with ","
                var lines = [];
            
                for (var i = 1; i < allTextLines.length; i++) {
                    var data = allTextLines[i]
                        .slice(1, -2)           // remove leading " and trailing ",
                        .split('","');          // split with ","
                    if (data.length === headers.length) {
            
                        var tarr = [];
                        for (var j = 0; j < headers.length; j++) {
                            tarr.push(data[j]);
                        }
                        lines.push(tarr);
                    } else {
                    }
                }
                console.log(lines);
                self.allCsv = lines;
                self.allTickerCsvLoaded = true;
            };
        }(this)));
    }
    
    
    
    static getTickerCsv() {
        return this.allCsv;
    }
    
    
    
    static runOnceTickerCsvLoaded(callback = function() {}) {
        var timer = setInterval((function(self) {
            return function() {
                if (self.allTickerCsvLoaded) {
                    callback();
                    clearInterval(timer);
                }
            };
        }(this)), 20);
    }
}