import {SketchComponent} from "../../core/SketchComponent";
import {IInteractiveComponent} from "../../core/event/IInteractiveComponent";
import {DragMouseEvent} from "../../core/event/DragMouseEvent";
import {EventEmitter} from "events";
import {ClickEvent} from "../../core/event/ClickEvent";

export class ClickableRegion extends SketchComponent implements IInteractiveComponent {
    public onInteraction: EventEmitter = new EventEmitter();
    private readonly regionX: number;
    private readonly regionY: number;
    private readonly regionWidth: number;
    private readonly regionHeight: number;

    constructor(s: any, w: number, h: number, x: number, y: number, width: number, height: number) {
        super(s, w, h, true, s.P2D);
        this.regionX = x;
        this.regionY = y;
        this.regionWidth = width;
        this.regionHeight = height;
    }

    public createGraphic = () => {
    };

    public onClick(clickEvent: ClickEvent) {
        this.onInteraction.emit('click');
    }

    public onMouseDrag(dragEvent: DragMouseEvent) {
        return;
    }

    public onHover() {
    }

    public onHoverLost() {
    }

    public registerBounds(s: any): any {
        s.rectMode(this.renderer.CENTER);
        s.rect(this.regionX, this.regionY, this.regionWidth, this.regionHeight);
    }
}
