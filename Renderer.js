export default class Renderer {

    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', this.resizeCanvas);
    }

    resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };

    draw(player, blocks, camera) {
        const getX = x => {
            return (x - camera.x) * camera.zoom + this.canvas.width/2;
        };
        const getY = y => {
            return (camera.y - y) * camera.zoom + this.canvas.height/2;
        };
        const stretch = length => {
            return camera.zoom * length;
        };
        const setColor = (r,g,b) => {
            this.ctx.fillStyle = `rgb(${r},${g},${b})`;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "green";
        this.ctx.fillRect(getX(player.x), getY(player.y), stretch(player.width), stretch(player.height));

        blocks.forEach(block => {
            setColor(255,255,255);
            this.ctx.fillRect(getX(block.x), getY(block.y), stretch(block.width), stretch(block.height));
        });
    }
}