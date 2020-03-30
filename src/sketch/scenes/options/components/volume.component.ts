import {EventEmitter} from 'events';
import {SketchComponent} from '../../../core/SketchComponent';
import * as p5 from "p5";
import {Globals} from "../../../global/Globals";

export class VolumeComponent extends SketchComponent {
    public onInteraction: EventEmitter = new EventEmitter();
    private readonly title = 'Volume';
    private readonly font: p5.Font;
    private readonly fontSize = 60;

    constructor(s: any, w: number, h: number) {
        super(s, w, h, true, s.P2D);

        this.font = Globals.font;
        this.renderer.textFont(this.font, 100);
    }

    public createGraphic = () => {
        this.renderer.push();
        this.renderer.translate(this.width / 2, this.height * 0.25);
        this.renderer.textAlign(this.renderer.CENTER);
        this.renderer.rectMode(this.renderer.CENTER);
        this.renderer.noStroke();
        this.renderer.textSize(this.fontSize);
        this.renderer.fill(0);
        this.renderer.strokeWeight(4);
        this.renderer.text(this.title, 0, 0);
        this.renderer.pop();
    };
}
