import {EventEmitter} from 'events';
import {SketchComponent} from '../../../core/SketchComponent';
import * as p5 from "p5";
import {Globals} from "../../../global/Globals";

export class LevelSelectBanner extends SketchComponent {

    public onInteraction: EventEmitter = new EventEmitter();
    private readonly message: string;
    private readonly font: p5.Font;
    private readonly fontSize = 50;
    private readonly boxPadding = 50 * 0.3;
    private label: string;
    private xOffset: number;
    private yOffset: number;
    private bannerWidth: number;
    private bannerColor: number[];

    constructor(s: any, w: number, h: number, label: string, color = [255, 255, 255], width = 200, xOffset = 0, yOffset = 0) {
        super(s, w, h, true, s.P2D);

        this.label = label;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.bannerWidth = width;
        this.message = label;
        this.bannerColor = color;

        this.font = Globals.font;
        this.renderer.textFont(this.font, 100);
        this.renderer.textAlign(this.renderer.CENTER);
    }

    public createGraphic = () => {
        this.renderer.push();
        this.renderer.translate(this.width * 0.5 + this.xOffset, this.height * 0.5 + this.yOffset);
        this.renderer.rectMode(this.renderer.CENTER);
        this.renderer.noStroke();
        this.renderer.fill(this.bannerColor);
        this.renderer.textSize(this.fontSize);
        this.renderer.rect(
            0,
            -this.fontSize / 4,
            Math.max(this.renderer.textWidth(this.message) + this.boxPadding, this.bannerWidth),
            this.fontSize + this.boxPadding
        );
        this.renderer.fill(0);
        this.renderer.text(this.message, 0, 0);
        this.renderer.pop();
    };
}
