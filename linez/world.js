// 'use strict';


class World {

    constructor(startPosition = [1, 1]) {
        this.Blocks = {
            startPosition: startPosition,
            playerPosition: startPosition,
            grid: [],
            BLOCKWIDTH: 20,
            BLOCKSPACE: 2,
            Flags: {
                jumpingUp: false,
                inTheAir: false,
                fallingDown: false,
                frameCounterActive: false,
                frameCounter: 0,
            },
            Delays: {
                FALLINGTIME: 10
            },
            Keys: {
                LEFT: 37,
                RIGHT: 39,
                UP: 38,
                currentKey: -1
            },
            Status: {
                FINISHED: Symbol('finished'),
                DEATH: Symbol('death')
            },
            Colors: {
                PLAYER: 'red',
                SOLID: 'grey',
                AIR: '',
                BLACK: 'black',
                END: 'yellow',
                CRACKED: '',
                PORTAL: 'purple',
                LINE: 'blue',
                BACKGROUND: 'lightgrey'
            },
            Type: {
                PLAYER: Symbol('player'),
                SOLID: Symbol('solid'),
                AIR: Symbol('air'),
                BLACK: Symbol('black'),
                END: Symbol('end'),
                CRACKED: Symbol('cracked'),
                PORTAL: Symbol('portal'),
                LINE: Symbol('line')
            }
        };
        
        
        var b = this.Blocks.Type;
        this.Blocks.grid = [
            [b.SOLID,   b.SOLID,  b.SOLID,    b.SOLID,    b.SOLID,   b.SOLID,   b.SOLID,  b.SOLID],
            [b.SOLID,   b.AIR,    b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.AIR,    b.SOLID],
            [b.SOLID,   b.SOLID,  b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.AIR,    b.SOLID],
            [b.SOLID,   b.AIR,    b.SOLID,    b.SOLID,    b.SOLID,   b.AIR,     b.AIR,    b.SOLID],
            [b.SOLID,   b.AIR,    b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.AIR,    b.SOLID],
            [b.SOLID,   b.SOLID,  b.SOLID,    b.BLACK,    b.AIR,     b.AIR,     b.AIR,    b.SOLID],
            [b.SOLID,   b.END,    b.AIR,      b.AIR,      b.AIR,     b.AIR,     b.BLACK,  b.SOLID],
            [b.SOLID,   b.SOLID,  b.SOLID,    b.SOLID,    b.SOLID,   b.SOLID,   b.SOLID,  b.SOLID]
        ];
        
        
        
        // main game loop set to 60 fps
        // setInterval(this.main, 15);
        window.self = this;
        window.requestAnimationFrame(this.main);
        
        
        
        
        var that = this;
        // kb is the input box that keybord events go to
        $('#kb').keydown(function(event) {
            that.triggerKey(event.keyCode);
        });
        
        
        // touch events for onscreen arrow keys
        $('#keys').on('touchstart', function(e) {
            console.log(e.target.nearestViewportElement.id);
            var button = e.target.nearestViewportElement.id;
            
            if (button === 'left') {
                that.triggerKey(that.Blocks.Keys.LEFT);
                $('#left polygon').attr('style', 'fill:green');
            }   else if (button === 'right') {
                that.triggerKey(that.Blocks.Keys.RIGHT);
                $('#right polygon').attr('style', 'fill:green');
            } else if (button === 'up') {
                that.triggerKey(that.Blocks.Keys.UP);
                $('#up polygon').attr('style', 'fill:green');
            }
            
            e.preventDefault();
        });
        
        $('#keys').on('touchend', function() {
            $('#left polygon').attr('style', 'fill:lime');
            $('#right polygon').attr('style', 'fill:lime');
            $('#up polygon').attr('style', 'fill:lime');
        });
        
    }
    
    
    
    
    main() {
        self.movePlayer(self.Blocks.Keys.currentKey);
        
        
        // console.log(self.Blocks.playerPosition);
        // console.log(self.Blocks.grid[self.Blocks.playerPosition[1] + 1][self.Blocks.playerPosition[0]]);
        var groundBlock = self.Blocks.grid[self.Blocks.playerPosition[1] + 1][self.Blocks.playerPosition[0]];
        // Gravity
        if (groundBlock === self.Blocks.Type.AIR) {
            self.Blocks.Flags.fallingDown = true;
            self.Blocks.Flags.frameCounterActive = true;
            self.Blocks.Flags.inTheAir = true;
        }
        
        if (self.Blocks.Flags.fallingDown &&
            self.Blocks.Flags.frameCounterActive &&
            self.Blocks.Flags.frameCounter === self.Blocks.Delays.FALLINGTIME &&
            groundBlock == self.Blocks.Type.AIR) {
            self.applyGravity();
            self.Blocks.Flags.fallingDown = false;
            self.Blocks.Flags.frameCounterActive = false;
            self.Blocks.Flags.frameCounter = 0;
        }
        
        if (groundBlock === self.Blocks.Type.SOLID ||
            groundBlock === self.Blocks.Type.BLACK ||
            groundBlock === self.Blocks.Type.END) {
            self.Blocks.Flags.inTheAir = false;
        }
        
        
        self.Blocks.Keys.currentKey = -1;
        if (self.Blocks.Flags.frameCounterActive) self.Blocks.Flags.frameCounter++;
        self.refresh();
        
        window.requestAnimationFrame(self.main);
    }
    
    
    
    // trigger key
    triggerKey(key) {
        this.Blocks.Keys.currentKey = key;
    }
    
    
    
    // Makes player "fall" down
    applyGravity() {
        this.Blocks.playerPosition[1]++;
        this.refresh();
    }
    
    
    // reset game
    resetGame() {
        this.Blocks.playerPosition = this.Blocks.startPosition;
        this.Blocks.Flags.inTheAir = false;
        this.Blocks.Flags.jumpingUp = false;
        this.Blocks.Flags.fallingDown = false;
        this.Blocks.Flags.frameCounter = 0;
        this.Blocks.Flags.frameCounterActive = false;
        this.refresh();
    }
    
    
    // Refresh screen
    refresh() {
        this.drawScreen(this.Blocks.grid, this.Blocks.playerPosition);
    }
    
    
    
    // Render screen
    drawScreen(grid, playerPos) {
        // Draw background
        this.drawRectangle(0, 0, grid[0].length * (this.Blocks.BLOCKWIDTH + this.Blocks.BLOCKSPACE), grid.length * (this.Blocks.BLOCKWIDTH + this.Blocks.BLOCKSPACE), this.Blocks.Colors.BACKGROUND);
    
        // Draw blocks
        for (var y = 0; y < grid.length; y++) {
            for (var x = 0; x < grid.length; x++) {
                var currentBlock = grid[y][x];
                if (currentBlock === this.Blocks.Type.SOLID) {
                    this.drawBlock(x, y, this.Blocks.Colors.SOLID);
                } else if (currentBlock === this.Blocks.Type.BLACK) {
                    this.drawBlock(x, y, this.Blocks.Colors.BLACK);
                } else if (currentBlock === this.Blocks.Type.END) {
                    this.drawBlock(x, y, this.Blocks.Colors.END);
                } else if (currentBlock === this.Blocks.Type.CRACKED) {
                    this.drawBlock(x, y, this.Blocks.Colors.CRACKED);
                } else if (currentBlock === this.Blocks.Type.LINE) {
                    this.drawBlock(x, y, this.Blocks.Colors.LINE);
                } else if (currentBlock === this.Blocks.Type.PORTAL) {
                    this.drawBlock(x, y, this.Blocks.Colors.PORTAL);
                }
            }
        }
    
        // Draw player
        this.drawBlock(playerPos[0], playerPos[1], this.Blocks.Colors.PLAYER);

    }
    
    
    
    movePlayer(key) {
        if (key === -1) return;
        
        var nextPos;
        var jumping = false;
        if (key == this.Blocks.Keys.LEFT) {
            nextPos = [this.Blocks.playerPosition[0] - 1, this.Blocks.playerPosition[1]];
        } else if (key == this.Blocks.Keys.RIGHT) {
            nextPos = [this.Blocks.playerPosition[0] + 1, this.Blocks.playerPosition[1]];
        } else if (key == this.Blocks.Keys.UP) {
            nextPos = [this.Blocks.playerPosition[0], this.Blocks.playerPosition[1] - 1];
            jumping = true;
        } else {
            nextPos = this.Blocks.playerPosition;
        }
        
        
        var blockAbove = this.Blocks.grid[nextPos[1] - 1][nextPos[0]];
        var block = this.Blocks.grid[nextPos[1]][nextPos[0]];
        var groundBlock = this.Blocks.grid[nextPos[1] + 1][nextPos[0]];
        
        if (jumping && blockAbove === this.Blocks.Type.AIR && !this.Blocks.Flags.inTheAir) {
            this.Blocks.Flags.jumpingUp = true;
            this.Blocks.Flags.frameCounter = 0;
            this.Blocks.Flags.frameCounterActive = true;
            this.Blocks.playerPosition = [nextPos[0], nextPos[1] - 1];
        }
        
        
        if (block === this.Blocks.Type.SOLID) {
            // cannot move
        } else if (block === this.Blocks.Type.BLACK) {
            // cannot move
        } else if (block === this.Blocks.Type.END) {
            // You won!
            this.resetGame();
            alert('You won!');
        // Standing on black block
        } else if (groundBlock === this.Blocks.Type.BLACK) {
            // game over, back to start
            this.Blocks.playerPosition = nextPos;
            setTimeout(function() {
                // Back to start
                this.resetGame();
            }, 300);
        } else if (block === this.Blocks.Type.AIR) {
            this.Blocks.playerPosition = nextPos;
            console.log('moved to ' + nextPos);
        }
    }
    
    
    
    getGrid() {
        return this.Blocks.grid;
    }
    
    
    
    drawBlock(x, y, color) {
        this.drawRectangle(x * (this.Blocks.BLOCKWIDTH + this.Blocks.BLOCKSPACE), y * (this.Blocks.BLOCKWIDTH + this.Blocks.BLOCKSPACE), this.Blocks.BLOCKWIDTH, this.Blocks.BLOCKWIDTH, color);
    }
}