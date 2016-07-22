var WIDTH = 50;
var HEIGHT = 50;
var TICK_LENGTH = 1500;
var TYPES = {
    empty: 0,
    wire: 1,
    head: 2,
    tail: 3,
};

var block;
var row;
var gridElement = document.getElementById('grid');
// grid accessed using grid[y][x]
var grid = [];
var heads = [];
var markedForRemoval = [];
var currentType = TYPES.wire;




createGrid();
// mainLoop();
// bindEventHandlers();

// setTimeout(mainLoop(), TICK_LENGTH);



function mainLoop() {
    var x;
    var y;
    var emptyWires;
    var heads2;
    var tail;
    // copy grid into nextGrid
    var nextGrid = JSON.parse(JSON.stringify(grid));
    var headIndiciesToRemove = [];
    
    
    // remove tails that no longer have a head
    for (var i = 0; i < markedForRemoval.length; i++) {
        nextGrid[markedForRemoval[i][0]][markedForRemoval[i][1]] = TYPES.wire;
    }
    
    
    var length = heads.length;
    for (var i = 0; i < length; i++) {
        y = heads[i][0];
        x = heads[i][1];
        
        
        nextGrid[y][x] = TYPES.tail;
        
        // one head can only have one tail
        tail = searchNeighborsByType(y, x, TYPES.tail);
        console.log('yx: ' + y + ', ' + x);
        nextGrid[tail[0][0]][tail[0][1]] = TYPES.wire;
        
        emptyWires = searchNeighborsByType(y, x, TYPES.wire);
        
        var deleteTail = true;
        for (var j = 0; j < emptyWires.length; j++) {
            heads2 = searchNeighborsByType(emptyWires[j][0], emptyWires[j][1], TYPES.head);
            if (heads2.length < 2) {
                // move head to position
                nextGrid[emptyWires[j][0]][emptyWires[j][1]] = TYPES.head;
                console.log('pushing: ' + emptyWires[j][0] + ', ' + emptyWires[j][1]);
                heads.push([emptyWires[j][0], emptyWires[j][1]]);
                deleteTail = false;
            }
        }
        headIndiciesToRemove.push(i);
        
        if (deleteTail) {
            markedForRemoval.push([y, x])
        }
    }
    
    
    // remove indicies in head
    for (var i = 0; i < headIndiciesToRemove.length; i++) {
        // minus i because splice shifts array
        heads.splice(headIndiciesToRemove[i] - i, 1);
    }
    
    grid = JSON.parse(JSON.stringify(nextGrid));
    repaint();
}



function bindEventHandlers() {
    document.getElementById('grid').onclick = function(e) {
        var y = e.target.id.split(',')[0];
        var x = e.target.id.split(',')[1];
        console.log(y + ', ' + x);
        
        if (currentType === TYPES.head) {
            heads.push([y, x]);
        }
        
        grid[y][x] = currentType;
        repaint();
    };
}



function createGrid() {
    for (var i = 0; i < HEIGHT; i++) {
        row = document.createElement('div');
        row.classList.add('row');
        grid.push([]);
        
        for (var j = 0; j < WIDTH; j++) {
            block = document.createElement('div');
            block.classList.add('block');
            block.setAttribute('id', i + ',' + j);
            block.style.backgroundColor = 'white';
            row.appendChild(block);
            // grid[i].push(Math.random() < 0.5 ? TYPES.empty : TYPES.wire);
            grid[i].push(TYPES.empty);
        }
        
        gridElement.appendChild(row);
    }
}



function repaint() {
    var color, row, block, gridElement = document.getElementById('grid');
    
    
    for (var i = 0; i < HEIGHT; i++) {
        row = gridElement.childNodes[i];
        
        for (var j = 0; j < WIDTH; j++) {
            block = row.childNodes[j];
            
            switch (grid[i][j]) {
                case TYPES.empty:
                    color = 'black';
                    break;
                    
                case TYPES.wire:
                    color = 'gold';
                    break;
                    
                case TYPES.head:
                    color = 'red';
                    break;
                    
                case TYPES.tail:
                    color = 'yellow';
                    break;
                
                default:
                    throw new TypeError('Invalid block type');
            }
            block.style.backgroundColor = color;
        }
    }
}



function changeType(type) {
    currentType = type;
}



function searchNeighborsByType(y, x, type) {
    var neighbors = [];
    
    // console.log('source: ' + y + ', ' + x);
    
    pushIfCellIsType(y + 1, x + 1);
    pushIfCellIsType(y    , x + 1);
    pushIfCellIsType(y - 1, x + 1);
    pushIfCellIsType(y - 1, x    );
    pushIfCellIsType(y - 1, x - 1);
    pushIfCellIsType(y    , x - 1);
    pushIfCellIsType(y + 1, x - 1);
    pushIfCellIsType(y + 1, x    );
    
    function pushIfCellIsType(y, x) {
        // if (typeof grid[y] !== 'undefined') console.log(y + ', ' + x + ' type: ' + grid[y][x]);
        if (y > -1 && y < HEIGHT && x > -1 && x < WIDTH && grid[y][x] === type) neighbors.push([y, x]);
    }
    
    return neighbors;
}