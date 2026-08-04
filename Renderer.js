export default class Renderer {

    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.getX;
        this.getY;
        this.stretch;
    }

    setColor(r,g,b){
        this.ctx.fillStyle = `rgb(${r},${g},${b})`;
    }

    resizeCanvas(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };

    defineTransformations(camera){
        this.getX = x => {
            return (x - camera.x) * camera.zoom + this.canvas.width/2;
        };
        this.getY = y => {
            return (camera.y - y) * camera.zoom + this.canvas.height/2;
        };
        this.stretch = length => {
            return camera.zoom * length;
        };
    }

    draw(player, blocks, camera) {
        
        this.defineTransformations(camera);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const block of blocks){
            this.setColor(200,200,255 - 200 * block.jumpPower);
            this.ctx.fillRect(this.getX(block.x), this.getY(block.y), this.stretch(block.width), this.stretch(block.height));
        }

        this.setColor(0,100,0);
        this.ctx.fillRect(this.getX(player.x), this.getY(player.y), this.stretch(player.width), this.stretch(player.height));
    }
}