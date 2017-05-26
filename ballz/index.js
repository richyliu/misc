// array of the blocks' health ([row][column] of [6][8])
let blocks = [];
for (let i = 0; i < 6; i++) {
    blocks.push(Array(8).fill(-1));
}

// array of the position and direction of all the balls
// [x, y, direction]
let balls = [];


// how far to move each tick (about 60 times a second)
const TICK_DISTANCE = 3;

// size of each block in pixels
const BLOCK_SIZE = 50;
// margin around each block
const PADDING = 5;
const TOTAL_BLOCK_SIZE = BLOCK_SIZE + PADDING;
const BALL_RADIUS = 7;

// width and height of the canvas
const WIDTH = 330;
const HEIGHT = 470;

// how long in ms to wait between each ball's release
const RELEASE_SPEED = 250;
// x and y of where the balls are released from
const RELEASE_X = 165;
const RELEASE_Y = 430;




/**
 * A ball hits one block
 * @param {number} x X position of the block
 * @param {number} y Y position of the block
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
    balls.forEach(ball => {
        // move the ball
        ball[0] += Math.cos(ball[2]) * TICK_DISTANCE; // x coord
        ball[1] += Math.sin(ball[2]) * TICK_DISTANCE; // y coord
        
        
        // check for collision
        // Modulo the position to get the ball's position within a square.
        // Then it is easier to detect collisions (since everything else is a block)
        
        
        // current x and y of the block the ball is on (using integer division)
        let currentBlockX = Math.floor(ball[0] / TOTAL_BLOCK_SIZE);
        let currentBlockY = Math.floor(ball[1] / TOTAL_BLOCK_SIZE);
        // x position of the ball within the block
        let blockX = ball[0] % TOTAL_BLOCK_SIZE;
        let blockY = ball[1] % TOTAL_BLOCK_SIZE;
        
        // ensure ball is going left and check for collision left of block
        if (Math.abs(ball[2]) > Math.PI*0.5 && blockX < BALL_RADIUS) {
            // if left is wall
            if (currentBlockX === 0) {
                ball[2] = bounce(ball[2], 'left');
                return;
            } else if (blocks[currentBlockX - 1][currentBlockY] > 0) {
                hit(currentBlockX - 1, currentBlockY);
                ball[2] = bounce(ball[2], 'left');
                return;
            }
        }
        // ensure ball is going right and check for collision right of block
        if (Math.abs(ball[2]) < Math.PI*0.5 && blockX > TOTAL_BLOCK_SIZE - BALL_RADIUS) {
            // if right is wall
            if (currentBlockX === 5) {
                ball[2] = bounce(ball[2], 'right');
                return;
            } else if (blocks[currentBlockX + 1][currentBlockY] > 0) {
                hit(currentBlockX + 1, currentBlockY);
                ball[2] = bounce(ball[2], 'right');
                return;
            }
        }
        // ensure ball is going top and check for collision top of block
        if (ball[2] < 0 && blockY < BALL_RADIUS) {
            // if top is wall
            if (currentBlockY === 0) {
                ball[2] = bounce(ball[2], 'top');
                return;
            } else if (blocks[currentBlockX][currentBlockY - 1] > 0) {
                hit(currentBlockX, currentBlockY - 1);
                ball[2] = bounce(ball[2], 'top');
                return;
            }
        }
        // ensure ball is going bottom and check for collision bottom of block    
        if (ball[2] > 0 && blockY > TOTAL_BLOCK_SIZE - BALL_RADIUS) {
            // kill ball if bottom is wall
            if (currentBlockY === 7) {
                balls.splice(balls.indexOf(ball), 1);
                return;
            } else if (blocks[currentBlockX][currentBlockY + 1] > 0) {
                hit(currentBlockX, currentBlockY + 1);
                ball[2] = bounce(ball[2], 'bottom');
                return;
            }
        }
    });
}



/**
 * Bounce a ball off block/wall
 * @param  {number} direction The direction the ball is going
 * @param  {String} side      Where the block/wall is relative to the ball. Use
 *                            "left", "right", "top", or "bottom"
 * @return {number}           The direction the ball is now going.
 */
function bounce(direction, side) {
    // left and right are easy, just flip the sign of the direction
    if (side == 'left' || side == 'right') {
        if (direction < 0) {
            return -Math.PI - direction;
        } else {
            return Math.PI - direction;
        }
    } else if (side == 'top' || side == 'bottom') {
        return -direction;
    } else {
        console.error('Invalid direction to bounce in! (Direction: ' + direction + ')');
    }
}



/**
 * Draw the frame
 */
function draw() {
    moveBalls();
    
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




/**
 * Release a certain number of balls from the starting point
 * @param  {number} amount Amount of balls to release
 * @param  {number} angle  Angle at which to release the ball. In radians, has
 *                         to be between -0.1pi and -0.9pi
 */
function releaseBalls(amount, angle) {
    let count = 0;
    let thisInterval = window.setInterval(() => {
        count++;
        balls.push([RELEASE_X, RELEASE_Y, angle]);
        if (count >= amount) {
            window.clearInterval(thisInterval);
        }
    }, RELEASE_SPEED);
}




/**
 * Progress to the next level by moving the screen down. Call this at the end
 * after the user has shot all their balls. Checks if user has lost (if any
 * block move below the screen).
 */
function nextLevel() {
    blocks.forEach(column => {
        if (column[7] > -1) {
            console.log('User has lost!');
            return;
        } else {
            // TODO: generate new layer
        }
    });
}




blocks[5][7] = 104;
blocks[5][5] = 111;
blocks[4][6] = 55;
blocks[2][3] = 444;
blocks[4][2] = 55;
blocks[4][3] = 27;
blocks[3][6] = 3;
blocks[4][7] = 20;
blocks[3][3] = 39;
blocks[0][3] = 200;
blocks[1][6] = 200;
releaseBalls(10, Math.PI * -0.7);

requestAnimationFrame(draw);