// array of the blocks' health ([row][column] of [6][8])
let blocks = [];
for (let i = 0; i < 6; i++) {
    blocks.push(Array(8).fill(-1));
}

// array of the position and direction of all the balls
// [x, y, direction]
let balls = [];


/**
 * A ball hits one block
 * @param x {Number} X position of the block
 * @param y {Number} Y position of the block
 */
function hit(x, y) {
    blocks[x][y]--;
    // set block to not exist if it has 0 health
    if (blocks[x][y] === 0) {
        blocks[x][y] = -1;
    }
}



/**
 * Move all the balls, checking for hits and bounces
 */
function moveBalls() {
    // how far to move each tick
    const TICK_DISTANCE = 0.5;
    
    const BLOCK_SIZE = 50;
    const PADDING = 5;
    const TOTAL_BLOCK_SIZE = BLOCK_SIZE + PADDING;
    const BALL_RADIUS = 10;
    
    balls.forEach(ball => {
        // move the ball
        ball[0] += Math.cos(ball[2]) * TICK_DISTANCE;
        ball[1] += Math.sin(ball[2]) * TICK_DISTANCE;
        
        // check for collision
        // Modulo the position to get the ball's position within a square.
        // Then it is easier to detect collisions (since everything else is a block)
        
        
        // current x and y of the block the ball is on (using integer division)
        let currentBlockX = Math.floor(ball[0] / TOTAL_BLOCK_SIZE);
        let currentBlockY = Math.floor(ball[1] / TOTAL_BLOCK_SIZE);
        
        // CHECK FOR collision left of block
        if (ball[0] % TOTAL_BLOCK_SIZE < BALL_RADIUS) {
            // if left is wall
            if (currentBlockX === 0) {
                ball[2] = bounce(ball[2], 'left');
            } else if (blocks[currentBlockX - 1][currentBlockY] > 0) {
                hit(currentBlockX - 1, currentBlockY);
                ball[2] = bounce(ball[2], 'left');
            }
        // right of block
        } else if (ball[0] % TOTAL_BLOCK_SIZE > TOTAL_BLOCK_SIZE - BALL_RADIUS) {
            // if right is wall
            if (currentBlockX === 5) {
                ball[2] = bounce(ball[2], 'right');
            } else if (blocks[currentBlockX + 1][currentBlockY] > 0) {
                hit(currentBlockX + 1, currentBlockY);
                ball[2] = bounce(ball[2], 'right');
            }
        // top of block    
        } else if (ball[1] % TOTAL_BLOCK_SIZE < BALL_RADIUS) {
            // if top is wall
            if (currentBlockY === 0) {
                ball[2] = bounce(ball[2], 'top');
            } else if (blocks[currentBlockX][currentBlockY - 1] > 0) {
                hit(currentBlockX, currentBlockY - 1);
                ball[2] = bounce(ball[2], 'top');
            }
        // bottom of block    
        } else if (ball[1] % TOTAL_BLOCK_SIZE > TOTAL_BLOCK_SIZE - BALL_RADIUS) {
            // if bottom is wall
            // NOTE: doesn't work all the time, especially on corners
            console.log(currentBlockX + ', ' + currentBlockY);
            if (currentBlockY === 7) {
                ball[2] = bounce(ball[2], 'bottom');
            } else if (blocks[currentBlockX][currentBlockY + 1] > 0) {
                hit(currentBlockX, currentBlockY + 1);
                ball[2] = bounce(ball[2], 'bottom');
            }
        }
    });
}



/**
 * Bounce a ball off block/wall
 * @param direction {Number} The direction the ball is going
 * @param side {String} Where the block/wall is relative to the ball. Use
 *                      "left", "right", "top", or "bottom"
 * @return {Number} The direction the ball is now going.
 */
function bounce(direction, side) {
    // left and right are easy, just flip the sign of the direction
    if (side == 'left') {
        return Math.PI - direction;
    } else if (side == 'right') {
        return Math.PI * 3 - direction;
    } else if (side == 'top' || side == 'bottom') {
        return Math.PI * 2 - direction;
    } else {
        console.error('Invalid direction to bounce in! (Direction: ' + direction + ')');
    }
}



/**
 * Draw the frame
 */
function draw() {
    moveBalls();
    
    
    const BLOCK_SIZE = 50;
    const PADDING = 5;
    const TOTAL_BLOCK_SIZE = BLOCK_SIZE + PADDING;
    const BALL_RADIUS = 10;
    const WIDTH = 330;
    const HEIGHT = 440;
    let ctx = document.getElementById("canvas").getContext('2d');
    
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // draw blocks
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 8; y++) {
            if (blocks[x][y] > 0) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(
                    TOTAL_BLOCK_SIZE * x,
                    TOTAL_BLOCK_SIZE * y,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
                ctx.fillStyle = 'white';
                ctx.font = '35px serif';
                ctx.textAlign = 'center';
                ctx.fillText(
                    blocks[x][y],
                    TOTAL_BLOCK_SIZE * x + BLOCK_SIZE/2,
                    TOTAL_BLOCK_SIZE * y + BLOCK_SIZE * 5/6
                );
            }
        }
    }
    
    
    // draw balls
    ctx.fillStyle = 'white';
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball[0], ball[1], BALL_RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
    });
    
    
    if (!window.stopBallz) requestAnimationFrame(draw);
}


requestAnimationFrame(draw);



blocks[0][0] = 5;
blocks[1][0] = 23;
blocks[0][1] = 19;
blocks[1][1] = 99;
blocks[5][7] = 104;
blocks[2][3] = 444;
balls.push([250, 300, Math.PI * 1/4]);
draw();