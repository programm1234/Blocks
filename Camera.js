export default class Camera {

    constructor( x, y, zoom, waiting){
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this.waiting = waiting;
    }

    move(deltaTime, playerX, playerY){
        this.x = playerX + (this.x - playerX) * this.waiting ** deltaTime;
        this.y = playerY + (this.y - playerY) * this.waiting ** deltaTime;
    }
}