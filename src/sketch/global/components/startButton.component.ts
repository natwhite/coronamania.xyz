import {EventEmitter} from 'events';
import {ShrinkGrow} from '../../core/Animations';
import {ClickEvent} from '../../core/event/ClickEvent';
import {DragMouseEvent} from '../../core/event/DragMouseEvent';
import {IInteractiveComponent} from '../../core/event/IInteractiveComponent';
import {SketchComponent} from '../../core/SketchComponent';
import * as p5 from "p5";
import {Globals} from "../Globals";

// TODO : Refactor and split into title and startbutton sketch components.
export class StartButtonComponent extends SketchComponent implements IInteractiveComponent {

    public startButtonShrinkGrow: ShrinkGrow;
    public displayOutline = false;
    public outlineColor = 255;
    public startButtonHovered = false;
    public display = true;

    public onInteraction: EventEmitter = new EventEmitter();
    private font: p5.Font;
    private yPosPercent: number;
    private xPosPercent: number;

    constructor(s: any, w: number, h: number, xPosPercent: number = 0.5, yPosPercent: number = 0.5) {
        super(s, w, h, true, s.P2D);

        this.xPosPercent = xPosPercent;
        this.yPosPercent = yPosPercent;
        this.font = Globals.font;
        this.renderer.textFont(this.font, 100);
        this.renderer.textAlign(this.renderer.CENTER);
        this.startButtonShrinkGrow = new ShrinkGrow(this.renderer, 1, 1.2, 1);
    }

    public createStartButton = () => {
        this.renderer.push();
        this.renderer.translate(this.width * this.xPosPercent, this.height * this.yPosPercent);
        this.renderer.rectMode(this.renderer.CENTER);

        if (this.startButtonHovered) {
            this.renderer.scale(1.3);
        } else {
            this.startButtonShrinkGrow.nextState();
        }

        this.renderer.fill(0);
        this.renderer.stroke(this.outlineColor);
        this.renderer.strokeWeight(4);
        if (this.displayOutline) {
            this.renderer.strokeWeight(6);
        }
        this.renderer.textSize(80);
        this.renderer.text('Tap To Start!', 0, 0);
        this.renderer.pop();
    };

    public createGraphic = () => {
        if (!this.display) return;
        this.createStartButton();
    };

    public onClick(clickEvent: ClickEvent) {
        this.onInteraction.emit('click');
    }

    public onMouseDrag(dragEvent: DragMouseEvent) {
        return;
    }

    public onHover() {
        this.displayOutline = true;
        this.startButtonHovered = true;
    }

    public onHoverLost() {
        this.displayOutline = false;
        this.startButtonHovered = false;
    }

    public registerBounds(s: any): any {
        if (!this.display) return;
        s.translate(this.width * this.xPosPercent, this.height * this.yPosPercent - 30);
        s.rectMode(this.renderer.CENTER);
        s.rect(0, 0, 500, 100);
    }
}
