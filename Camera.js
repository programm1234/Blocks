export default class Camera {

    constructor( x, y, desiredViewSize, waiting){
        this.x = x;
        this.y = y;
        this.desiredViewSize = desiredViewSize;
        this.zoom = 1;
        this.waiting = waiting;
    }

    setZoom(renderer){
        const {width, height} = renderer.canvas;
        this.zoom = Math.min(width, height) / this.desiredViewSize;
    }

    move(deltaTime, playerX, playerY){
        this.x = playerX + (this.x - playerX) * this.waiting ** deltaTime;
        this.y = playerY + (this.y - playerY) * this.waiting ** deltaTime;
    }
}