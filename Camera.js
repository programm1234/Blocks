export default class Camera {

    constructor( x, y, desiredViewSize, waiting){
        this.x = x;
        this.y = y;
        this.desiredViewSize = desiredViewSize;
        this.zoom = 1;
        this.waiting = waiting;
    }

    setZoom(renderer){
        let viewSize = Math.min(renderer.canvas.width, renderer.canvas.height);
        this.zoom = viewSize/this.desiredViewSize;
    }

    move(deltaTime, playerX, playerY){
        this.x = playerX + (this.x - playerX) * this.waiting ** deltaTime;
        this.y = playerY + (this.y - playerY) * this.waiting ** deltaTime;
    }
}