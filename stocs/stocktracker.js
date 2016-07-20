class StockTracker {
    constructor(amount, stockid, time) {
        this.time = time || new Date();
        this.amount = amount;
        this.stockid = stockid;

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
        this.getStockPrice(new Date(), this.stockid, Util.TYPES().CLOSE, (function(amount, callback) {
            return function(price) {
                callback(amount * price);
            };
        }(this.amount, callback || function() {})));
    }


    getInitialStockTotal(callback) {
        this.getStockPrice(this.time, this.stockid, Util.TYPES().CLOSE, (function(amount, callback) {
            return function(price) {
                callback(amount * price);
            };
        }(this.amount, callback || function() {})));
    }


    getStockPrice(time, stockid, type, callback) {
        // http://stackoverflow.com/questions/754593/source-of-historical-stock-data#answer-2152127

        // adjust time so that conversion to utc becomes correct and subtract 1 day
        time = new Date(time.getTime() - time.getTimezoneOffset() * 60000 - 24 * 60 * 60 * 1000);

        Util.getStockPriceFromTimeRange(time, time, stockid, type, function(resp) {
            callback(resp[0]);
        });
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
    
    
    static getStockIdFromName(stockName, callback) {
        // http://stackoverflow.com/questions/885456/stock-ticker-symbol-lookup-api
        // http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=toyota&region=1&lang=en&callback=main


    }


    static getStockPriceFromTimeRange(begin, end, stockid, type, callback) {
        this.jsonp('http://query.yahooapis.com/v1/public/yql?' +
            'q=' +
            encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' +
                stockid +
                '") and endDate = "' +
                end.toISOString().slice(0, 10) +
                '" and startDate = "' +
                begin.toISOString().slice(0, 10) +
                '"') +
            "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json",
            function(resp) {
                console.log(resp);
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
    
    
    static getStockPriceAndTimestamp(begin, end, stockid, type, callback) {
        this.getStockPriceFromTimeRange(begin, end, stockid, type, function(data, rawResp) {
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                newData.push([new Date(rawResp.query.results.quote[i].Date).getTime(), parseFloat(data[i])]);
            }
            
            callback(newData.reverse());
        });
    }
}