var g = new Game();
g.triggerKey(Blocks.Keys.RIGHT);

QUnit.test('constants test', function(assert) {
    assert.equal(b, Blocks.Type);
    assert.deepEqual(grid, [
        [b.SOLID,   b.SOLID,  b.SOLID,    b.SOLID,    b.SOLID,   b.SOLID,   b.SOLID,  b.SOLID],
        [b.SOLID,   b.AIR,    b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.AIR,    b.SOLID],
        [b.SOLID,   b.SOLID,  b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.AIR,    b.SOLID],
        [b.SOLID,   b.AIR,    b.SOLID,    b.SOLID,    b.SOLID,   b.AIR,     b.AIR,    b.SOLID],
        [b.SOLID,   b.AIR,    b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.AIR,    b.SOLID],
        [b.SOLID,   b.SOLID,  b.SOLID,    b.BLACK,    b.AIR,     b.AIR,     b.AIR,    b.SOLID],
        [b.SOLID,   b.END,    b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.BLACK,  b.SOLID],
        [b.SOLID,   b.SOLID,  b.SOLID,    b.SOLID,    b.SOLID,   b.SOLID,   b.SOLID,  b.SOLID]
    ]);
    assert.equal(Blocks.Keys.RIGHT, 39)
});


QUnit.test('key feedback', function(assert) {
    // assert.equal(Blocks.Keys.currentKey, Blocks.Keys.RIGHT);
    assert.deepEqual(playerPosition, [2, 1]);
});