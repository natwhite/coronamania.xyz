import * as p5 from "p5";

export class ClickEvent {
    public x: number;
    public y: number;
    public mouseButton: p5.UNKNOWN_P5_CONSTANT;

    constructor(s: any, width?: number, height?: number, scale: number = 1) {
        this.x = s.constrain(Math.floor(s.mouseX / scale), 0, width);
        this.y = s.constrain(Math.floor(s.mouseY / scale), 0, height);
        this.mouseButton = s.mouseButton;
    }
}
