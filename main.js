import Renderer from "./Renderer.js";
import Block from "./Block.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import {generate} from "./Generator.js";
import {MAXDELTA, STARTX, STARTY} from "./constants.js";

const renderer = new Renderer();
const player = new Player(STARTX - 20/2, STARTY + 10 + 50, 20, 50);
const camera = new Camera(player.x + player.width/2, player.y - player.height/2, 1000, 0.99);
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