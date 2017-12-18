// array of the blocks' health ([row][column] of [6][8])
let blocks = [];
for (let i = 0; i < 6; i++) {
    blocks.push(Array(8).fill(-1));
}

// array of the position and direction of all the balls
// [x, y, direction]
let balls = [];



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

// force at which to release the ball
const RELEASE_FORCE = 0.001;


// collision categories
const DEFAULT_COLLISION = 0x0001;



// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Composites = Matter.Composites;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 330,
        height: 470
    }
});


// setup world constants
engine.world.gravity.y = 0;
engine.world.gravity.scale = 0;
engine.world.bounds = {
    min: {
        x: -10,
        y: -10
    },
    max: {
        x: 1000,
        y: 1000
    }
};


let boundaryOpts = {
    id: 'wall0',
    isStatic: true,
    restitution: 1,
    frictionStatic: 0
};

World.add(engine.world, [
    Bodies.rectangle(-2.5, HEIGHT/2, 5, HEIGHT, boundaryOpts), // left wall
    Bodies.rectangle(WIDTH+2.5, HEIGHT/2, 5, HEIGHT, { id: 'wall1', isStatic: true, restitution: 1, frictionStatic: 0 }), // right wall
    Bodies.rectangle(WIDTH/2, -2.5, WIDTH, 5, { id: 'wall2', isStatic: true, restitution: 1, frictionStatic: 0 }), // top wall
    Bodies.rectangle(WIDTH/2, HEIGHT+2.5, WIDTH, 5, { id: 'bottom', isStatic: true, restitution: 1, frictionStatic: 0 }), // bottom wall
]);




/**
 * Release a certain number of balls from the starting point
 * @param  {number} amount Amount of balls to release
 * @param  {number} angle  Angle at which to release the ball. In radians, has
 *                         to be between -0.1pi and -0.9pi
 */
function releaseBalls(amount, angle) {
    let count = 0;
    balls = [];
    
    let thisInterval = window.setInterval(() => {
        count++;
        
        let ball = Bodies.circle(RELEASE_X, RELEASE_Y, BALL_RADIUS, {
            force: {
                x: Math.cos(angle) * RELEASE_FORCE,
                y: Math.sin(angle) * RELEASE_FORCE
            },
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1,
            inertia: Infinity,
            id: 'ba' + count,
            render: {
                fillStyle: 'blue'
            },
            collisionFilter: {
                mask: DEFAULT_COLLISION,
                category: 0x0002 // TODO: fix mask
            }
        });
        balls.push(ball);

        World.add(engine.world, ball);
        
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



function draw() {
    World.add(engine.world,
        Composites.stack(0, 0, 6, 8, BLOCK_SIZE, BLOCK_SIZE, (x, y, column, row) => {
            if (blocks[column][row] < 0) return;
            
            return Bodies.rectangle(
                x,
                y,
                BLOCK_SIZE,
                BLOCK_SIZE,
                {
                    isStatic: true,
                    collisionFilter: {
                        category: DEFAULT_COLLISION
                    },
                    id: ('00'+ (x*10+y)).slice(-2), // x is first digits, y second
                    render: {
                        strokeStyle: 'blue'
                    }
                }
            );
        })
    );
}




Events.on(engine, 'collisionEnd', event => {
    // contains the ids of both the objects that collided
    let collisionIds = event.pairs[0].id.split('_');
    // id of the object the ball collided into
    let coll = {};
    let ballId = '';
    
    // do nothing if hit wall
    if (collisionIds[0].slice(0, 4) == 'wall' || collisionIds[1].slice(0, 4) == 'wall') return;
    
    // kill ball if hit bottom
    if (collisionIds[0].slice(0, 6) == 'bottom') {
        World.remove(engine.world, balls[collisionIds[1].slice(2)]);
        return;
    } else if (collisionIds[1].slice(0, 6) == 'bottom') {
        World.remove(engine.world, balls[collisionIds[0].slice(2)]);
        return;
    }
    
    
    if (collisionIds[0].slice(0, 2) == 'ba') {
        ballId = collisionIds[0].slice(2);
        coll = { x: parseInt(collisionIds[1].slice(0, 1)), y: parseInt(collisionIds[1].slice(1))};
    } else {
        ballId = collisionIds[1].slice(2);
        coll = { x: parseInt(collisionIds[0].slice(0, 1)), y: parseInt(collisionIds[0].slice(1))};
    }
    console.log(coll);
    console.log(ballId);
    
    blocks[x][y]--;
    if (blocks[x][y] === 0) {
        blocks[x][y] = -1;
    }
});




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
releaseBalls(10, Math.PI * -0.7);


draw();
// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);