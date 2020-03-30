import * as p5 from "p5";
import {AnimationImages} from "../global/Globals";

export class PlayerAnimation {
    private idleImage: p5.Image;
    private successImage: p5.Image;
    private failImage: p5.Image;
    public currentImage: p5.Image;

    constructor(images: AnimationImages) {
        this.idleImage = images.idle;
        this.successImage = images.success;
        this.failImage = images.fail;
        this.currentImage = images.idle;
    }

    public idle() {
        this.currentImage = this.idleImage;
    }

    public success() {
        this.currentImage = this.successImage;
    }

    public fail() {
        this.currentImage = this.failImage;
    }
}
