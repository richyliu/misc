class Grid {
    
    constructor(grid, width, height) {
        this.grid = grid;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
    
    
    setCursor(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            throw new RangeError('Parameters out of bounds for grid');
        } else {
            this.x = x;
            this.y = y;
            this.getValue(x, y);
        }
    }
    
    
    moveCursor(direction) {
        var [a, x, y] = this.moveCursorBase(direction);
        this.x = x;
        this.y = y;
        
        return a;
    }
    
    
    peekCursor(direction) {
        var [a] = this.moveCursorBase(direction);
        
        return a;
    }
    
    
    moveCursorBase(direction) {
        var x = this.x;
        var y = this.y;
        
        if (direction.x < -1 || direction.x > 1 || direction.y < -1 || direction.y > 1) {
            throw new TypeError('Unknown direction');
        } else {
            x += direction.x;
            y += direction.y;
        }
        
        
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            throw new RangeError('Parameters out of bounds for grid');
        }
        
        return [this.getValue(x, y), x, y];
    }
    
    
    getValue(x, y) {
        return this.grid[y * this.height + x];
    }
    
}



class GridTraversal {
    
    constructor(grid = [], options = {}) {
        this.options = {
            width: (Number.isInteger(Math.sqrt(grid.length)) ? Math.sqrt(grid.length) : null),
            height: options.height || (Number.isInteger(Math.sqrt(grid.length)) ? Math.sqrt(grid.length) : null)
        };
        
        // add user options
        for (var option in options) {
            if (this.options[option] !== undefined && options.hasOwnProperty(option)) {
                this.options[option] = options[option];
            }
        }
        
        
        this.grid = new Grid(grid, this.options.width, this.options.height);
        
    }
    
    
    numPaths() {
        var paths = 0;
        
        return paths;
    }

    
    pathFromStartingPoint(x, y) {
        this.grid.setCursor(x, y);
        this.getLeftMostDirection(x, y);
    }
    
    
    getLeftMostDirection(x, y) {
        var value = this.grid.peekCursor(-1, -1)
            || this.grid.peekCursor(-1, -1)
            || this.grid.peekCursor(0, -1)
            || this.grid.peekCursor(1, -1)
            || this.grid.peekCursor(1, 0)
            || this.grid.peekCursor(1, 1)
            || this.grid.peekCursor(0, 1)
            || this.grid.peekCursor(-1, 1)
            || this.grid.peekCursor(-1, 0);
    }
    
}



var gt = new GridTraversal([
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
], {
    width: 3,
    height: 3
});

console.log(gt.numPaths());