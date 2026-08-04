import Renderer from "./Renderer.js";
import Block from "./Block.js";
import Player from "./Player.js";
import Camera from "./Camera.js";

const MAXDELTA = 20;
const MAPWIDTH = 1000;

const renderer = new Renderer();
const player = new Player( 500, 1050, 20, 50);
const camera = new Camera( 0, 0, 1000, 0.99);
const blocks = [];
for (let i = 0; i < 10; i++) {

    let x =  Math.random() * 1000;
    let y =  Math.random() * 1000;
    let width = 50;
    let height = 10;
    let jumpPower = 0.5 * (Math.random() ** 4) + 0.5;

    blocks.push(new Block( x, y, width, height, jumpPower));
}

let lastTime = 0;
resize();
window.addEventListener('resize', resize);
requestAnimationFrame(gameLoop);

function resize(){
    renderer.resizeCanvas();
    camera.setZoom(renderer);
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
    player.move(deltaTime, blocks);
    camera.move(deltaTime, player.x, player.y);
}