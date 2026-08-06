import Renderer from "./Renderer.js";
import Block from "./Block.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import {generate} from "./Generator.js";

const MAXDELTA = 20;

const renderer = new Renderer();
const player = new Player( 500 - 20/2, 10 + 50, 20, 50);
const camera = new Camera( 500 - player.width/2, 10**4, 1000, 0.99);
const blocks = generate();

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