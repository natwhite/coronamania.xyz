import {EventEmitter} from 'events';
import {ClickEvent} from '../../../core/event/ClickEvent';
import {DragMouseEvent} from '../../../core/event/DragMouseEvent';
import {IInteractiveComponent} from '../../../core/event/IInteractiveComponent';
import {SketchComponent} from '../../../core/SketchComponent';
import {SketchComponentManager} from '../../../core/SketchComponentManager';
import * as p5 from "p5";
import {Globals} from "../../../global/Globals";
import {Functions} from "../../../core/Functions";

export class LevelSelectButtonComponent extends SketchComponent implements IInteractiveComponent {
    public onInteraction: EventEmitter = new EventEmitter();
    private readonly label: string;
    private readonly font: p5.Font;
    private readonly fontSize = 40;
    private readonly boxPaddingRatio = 0.4;
    private readonly boxPadding: number;
    private outlineColor: number[] = [0, 0, 0, 0];
    private hovered: boolean = false;
    private componentManager: SketchComponentManager;
    private xOff: number;
    private yOff: number;
    private parentName: string;
    private buttonColor: number[];
    private locked: boolean;

    constructor(
        s: any,
        w: number,
        h: number,
        label: string,
        parent: string,
        color = [255, 255, 255],
        xOff: number = 0,
        yOff: number = 0,
        locked: boolean = false
    ) {
        super(s, w, h, true, s.P2D);
        this.label = label;
        this.parentName = parent;
        this.componentManager = new SketchComponentManager(s, w, h);
        this.xOff = xOff;
        this.yOff = yOff;
        this.boxPadding = this.fontSize * this.boxPaddingRatio;
        this.buttonColor = locked ? Functions.lerpColor(color, [0, 0, 0], 0.5) : color;
        this.locked = locked;

        this.font = Globals.font;
        this.renderer.textFont(this.font, 50);
        this.renderer.textAlign(this.renderer.CENTER);
    }

    public createGraphic = () => {
        this.renderer.push();
        // this.renderer.noFill();
        let scale = 1;
        if (this.hovered) {
            scale = 1.3;
        }

        this.renderer.fill(this.buttonColor);
        this.registerBounds(this.renderer, scale);
        this.renderer.strokeWeight(4);
        this.renderer.stroke(this.outlineColor);

        this.renderer.fill(0);
        this.renderer.text(this.label, 0, 0);
        this.renderer.imageMode(this.renderer.CENTER);
        if (this.locked) {
            this.renderer.image(
                Globals.lock,
                0,
                -this.fontSize / 3,
                this.fontSize + this.boxPadding,
                this.fontSize + this.boxPadding
            );
        }
        this.renderer.pop();
    };

    public onClick(clickEvent: ClickEvent) {
        if (this.locked) return;
        this.onInteraction.emit('click', this.parentName, this.label);
    }

    public onMouseDrag(dragEvent: DragMouseEvent) {
        return;
    }

    public onHover() {
        if (this.locked) return;
        this.outlineColor = [255];
        this.hovered = true;
    }

    public onHoverLost() {
        this.outlineColor = [0, 0, 0, 0];
        this.hovered = false;
    }

    public registerBounds(s: any, scale = 1): any {
        s.translate(this.width * 0.5 + this.xOff, this.height * 0.5 + this.yOff);
        // s.translate(this.width * 0.5, this.height * 0.5);
        s.rectMode(s.CENTER);
        s.noStroke();
        s.textSize(this.fontSize);
        s.scale(scale);
        s.rect(
            0,
            -this.fontSize / 3,
            s.textWidth(this.label) + this.boxPadding,
            this.fontSize + this.boxPadding
        );
    }
}
