import Keylistener from "./Keylistener.js";

const keylistener = new Keylistener();
const GRAVITY = 0.001;
const MOVEMENTSPEED = 0.3;

export default class player {

    constructor( x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
    }

    move(deltaTime, blocks){
        this.vx = MOVEMENTSPEED * (keylistener.d - keylistener.a);
        this.vy -= GRAVITY * deltaTime;

        this.x += this.vx * deltaTime;

        if(this.vy < 0){
            let indices = this.touchingBlockIndices(blocks);
            this.y += this.vy * deltaTime;
            let indices2 = this.touchingBlockIndices(blocks);

            for (let i = 0; i < indices2.length; i++){
                if(!indices.includes(indices2[i])){
                    this.y -= this.vy * deltaTime;
                    this.vy = blocks[indices2[i]].jumpPower;
                    break;
                }
            }
        } else{
            this.y += this.vy * deltaTime;
        }
    }

    touchingBlockIndices(blocks){
        let indices = [];
        for (let i = 0; i < blocks.length; i++){

            const block = blocks[i];
            const distRight = block.x - (this.x + this.width);
            const distLeft = this.x - (block.x + block.width);

            const distUp = block.y - block.height - this.y;
            const distDown = this.y - this.height - block.y;

            if(distRight > 0 || distLeft > 0) continue;
            if(distUp > 0 || distDown > 0) continue;

            indices.push(i);
        }
        return indices;
    }
}