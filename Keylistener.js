export default class Keylistener {

    constructor(){

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;

        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                    this.w = true;
                    break;
                case "KeyA":
                    this.a = true;
                    break;
                case "KeyS":
                    this.s = true;
                    break;
                case "KeyD":
                    this.d = true;
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyW":
                    this.w = false;
                    break;
                case "KeyA":
                    this.a = false;
                    break;
                case "KeyS":
                    this.s = false;
                    break;
                case "KeyD":
                    this.d = false;
                    break;
            }
        });
    }
}