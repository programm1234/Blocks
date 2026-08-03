import Renderer from "./Renderer.js";
import Block from "./Block.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import Keylistener from "./Keylistener.js";

const MAXDELTA = 20;
const GRAVITY = 0.001;
const MOVEMENTSPEED = 0.2;

const renderer = new Renderer();
const player = new Player( 500, 1050, 20, 50);
const camera = new Camera( 0, 0, 1, 0.99);
const keylistener = new Keylistener;
const blocks = [];
for (let i = 0; i < 40; i++) {

    let x =  Math.random() * 1000;
    let y =  Math.random() * 1000;
    let width = 50;
    let height = 10;

    blocks.push(new Block( x, y, width, height, 0.7));
}

let lastTime = 0;
init();

function init() {
    console.log("Spiel gestartet!");
    renderer.resizeCanvas();
    
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if(deltaTime > MAXDELTA) deltaTime = MAXDELTA;

    update(deltaTime);
    renderer.draw(player, blocks, camera);

    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {

    player.vx = MOVEMENTSPEED * (keylistener.d - keylistener.a);
    player.vy -= GRAVITY * deltaTime;

    player.x += player.vx * deltaTime;
    let block = touchingBlock();
    if(block != null){
        player.x -= player.vx * deltaTime;
        player.vx *= -1;
    }
    player.y += player.vy * deltaTime;
    block = touchingBlock();
    if(block != null){
        if(player.vy > 0){
            player.y -= player.vy * deltaTime;
            player.vy *= -1;
        }else{
            player.y -= player.vy * deltaTime;
            player.vy = block.jumpPower;
        }
    }

    camera.move(deltaTime, player.x, player.y);
}

function touchingBlock(){
    for (let i = 0; i < blocks.length; i++) {

        const block = blocks[i];

        const distRight = block.x - (player.x + player.width);
        const distLeft = player.x - (block.x + block.width);

        const distUp = block.y - block.height - player.y;
        const distDown = player.y - player.height - block.y;

        if(distRight > 0 || distLeft > 0) continue;
        if(distUp > 0 || distDown > 0) continue;

        return block;
    }
    return null;
}