import {EventEmitter} from 'events';
import {SketchComponent} from '../../../core/SketchComponent';
import * as p5 from "p5";
import {Globals} from "../../../global/Globals";

export class CreditsComponent extends SketchComponent {
    public onInteraction: EventEmitter = new EventEmitter();
    private readonly title = 'Credits';
    private readonly people: Array<{ name: string, title: string }> = [
        {name: 'Kevin Albregard', title: 'Lead Designer'},
        {name: 'Donna Dinh', title: 'Lead Artist'},
        {name: 'Connor Bish', title: 'Music / Sound Designer'},
        {name: 'Diamond Crawford', title: 'UI Artist'},
        {name: 'Nathaniel White', title: 'Lead Programmer'},
        {name: 'Ian Favreau', title: 'Environmental Artist'},
    ];
    private readonly font: p5.Font;
    private readonly titleFontSize = 80;
    private readonly fontSize = 50;

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
        this.renderer.textSize(this.titleFontSize);
        this.renderer.fill(0);
        this.renderer.strokeWeight(4);
        // this.renderer.stroke(this.outlineColor);
        this.renderer.text(this.title, 0, 0);
        this.renderer.translate(0, this.fontSize * 2);
        this.renderer.textSize(this.fontSize);
        for (const person of this.people) {
            this.renderer.text(`${person.name} : ${person.title}`, 0, 0);
            this.renderer.translate(0, this.fontSize * 1.2);
        }
        this.renderer.pop();
    };
}
