import Block from "./Block.js";
import {GRAVITY, MOVEMENTSPEED, TARGETX, TARGETY, STARTX, STARTY, FIELDWIDTH, BLOCKWIDTH, BLOCKHEIGHT} from "./constants.js";

export function generate(){
    let Blocks = [];
    Blocks.push(new Block(STARTX - BLOCKWIDTH/2, STARTY, BLOCKWIDTH, BLOCKHEIGHT, 0.5))
    while(getReachableY(TARGETX, Blocks) < TARGETY){
        addNewBlock(Blocks);
    }
    Blocks.push(new Block(TARGETX - BLOCKWIDTH/2, TARGETY, BLOCKWIDTH, BLOCKHEIGHT, 0.01))
    return Blocks;
}

function addNewBlock(Blocks){
    
    let x = Math.random() * FIELDWIDTH;
    let y = getReachableY(x, Blocks);
    let jumpPower = getNormal(0.3, 1.1);
    Blocks.push(new Block(x - BLOCKWIDTH/2, y, BLOCKWIDTH, BLOCKHEIGHT, jumpPower));
}

function getReachableY(x, Blocks){
    let max = - (10**4);
    for (const block of Blocks){
        let deltaX = Math.abs(x - (block.x + block.width/2));
        let minTime = deltaX / MOVEMENTSPEED;
        let bestTime = block.jumpPower / GRAVITY;
        let time = Math.max(minTime, bestTime);
        let reachedY = block.y + block.jumpPower * time - 0.5 * GRAVITY * time**2 - 20; // - 20 for safety
        if(reachedY > max) max = reachedY;
    }
    return max;
}

function getNormal(min, max){
    return (max - min) / 2 * (2 * Math.random() - 1) ** 3 + (max + min) / 2;
}