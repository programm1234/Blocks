import Renderer from "./Renderer.js";
import Block from "./Block.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import {generate} from "./Generator.js";
import {MAXDELTA, STARTX, STARTY, TARGETX, TARGETY, BLOCKWIDTH} from "./constants.js";

const renderer = new Renderer();
const player = new Player(STARTX - 20/2, STARTY + 10 + 50, 20, 50);
const camera = new Camera(player.x + player.width/2, player.y - player.height/2, 1000, 0.99);
let blocks;

let lastTime = 0;
resize();
window.addEventListener('resize', resize);

const Button = document.getElementById("Button");
Button.addEventListener("click", () => {
    Button.style.display = "none";
    init();
});

init();

function init(){
    player.reset(STARTX - 20/2, STARTY + 10 + 50);
    blocks = generate();
    requestAnimationFrame(gameLoop);
}

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

    if(player.y < -1000 || player.y - player.height > TARGETY && player.x > TARGETX - BLOCKWIDTH/2 && player.x + player.width < TARGETX + BLOCKWIDTH/2){
        Button.style.display = "inline-block";
        return;
    }

    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    player.move(deltaTime, blocks);
    camera.move(deltaTime, player.x, player.y);
}