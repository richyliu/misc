/* global QUnit */
/* global multipleTimeslotStockTracker */
/* global singleTimeslotStockTracker */
/* global Util */
/* global PreUtil */



PreUtil.loadAll();



QUnit.test('multipleTimeslotStockTracker buy', function(assert) {
    var stock = new multipleTimeslotStockTracker('AAPL');

    stock.buy(5, new Date('2016-1-4'));
    stock.buy(5, new Date('2016-5-2'));

    assert.equal(JSON.stringify(stock.getTotal()), '[{"time":"2016-01-04T08:00:00.000Z","amount":5,"ticker":"AAPL"},{"time":"2016-05-02T07:00:00.000Z","amount":5,"ticker":"AAPL"}]');
});



QUnit.test('multipleTimeslotStockTracker sell', function(assert) {
    var stock = new multipleTimeslotStockTracker('AAPL');

    stock.buy(5, new Date('2016-1-4'));
    stock.buy(9, new Date('2016-5-2'));
    stock.buy(3, new Date('2016-6-2'));

    stock.sell(3, new Date('2016-7-25'));

    assert.equal(JSON.stringify(stock.getTotal()), '[{"time":"2016-01-04T08:00:00.000Z","amount":2,"ticker":"AAPL"},{"time":"2016-05-02T07:00:00.000Z","amount":9,"ticker":"AAPL"},{"time":"2016-06-02T07:00:00.000Z","amount":3,"ticker":"AAPL"}]');

    stock.sell(9, new Date('2016-9-9'), function(price) {
        assert.equal(price, 61.98998400000001);
    });
});



QUnit.test('singeTimeslotStockTracker', function(assert) {
    var s = new singleTimeslotStockTracker(10, 'aapl', new Date('2016-1-4'));

    assert.equal(JSON.stringify(s.getDate()), '\"2016-01-04T08:00:00.000Z\"');
    assert.equal(s.getAmount(), 10);
    assert.equal(s.getTicker(), 'aapl');
});



QUnit.test('Util getTickerFromName', function(assert) {
    console.log(Util.getTickerFromName('apple'));
    
    // assert.equal(Util.getTickerFromName('microsoft'), 10);
});