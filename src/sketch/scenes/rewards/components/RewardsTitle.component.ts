import {EventEmitter} from 'events';
import {SketchComponent} from '../../../core/SketchComponent';
import * as p5 from "p5";
import {Globals} from "../../../global/Globals";

export class RewardsTitleComponent extends SketchComponent {

    public onInteraction: EventEmitter = new EventEmitter();
    private readonly message = 'Rewards';
    private readonly font: p5.Font;
    private readonly fontSize = 80;
    private readonly boxPadding = 80 * 0.3;

    constructor(s: any, w: number, h: number) {
        super(s, w, h, true, s.P2D);

        this.font = Globals.font;
        this.renderer.textFont(this.font, 100);
        this.renderer.textAlign(this.renderer.CENTER);
    }

    public createGraphic = () => {
        this.renderer.push();
        this.renderer.translate(this.width / 2, this.height * 0.1);
        this.renderer.rectMode(this.renderer.CENTER);
        this.renderer.noStroke();
        this.renderer.fill(255);
        this.renderer.textSize(this.fontSize);
        this.renderer.rect(
            0,
            -this.fontSize / 4,
            this.renderer.textWidth(this.message) + this.boxPadding,
            this.fontSize + this.boxPadding
        );
        this.renderer.fill(0);
        this.renderer.strokeWeight(4);
        // this.renderer.stroke(this.outlineColor);
        this.renderer.text(this.message, 0, 0);
        this.renderer.pop();
    };
}
