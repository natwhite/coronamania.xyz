import {ClickEvent} from './event/ClickEvent';
import {DragMouseEvent} from './event/DragMouseEvent';
import {IInteractiveComponent} from './event/IInteractiveComponent';
import {SketchEventHandler} from './event/SketchEventHandler';
import {SketchComponent} from './SketchComponent';

export class SketchComponentManager {
    public s: any;
    public width: number;
    public height: number;
    public components: SketchComponent[];
    public eventHandler: SketchEventHandler;
    public resizeDebounceTime = 250;
    public timeSinceResizeRequest = 0;
    public requireResize = true;

    // public debugMode = true;

    constructor(s: any, width: number, height: number) {
        this.s = s;
        this.width = width;
        this.height = height;
        this.components = [];
        this.eventHandler = new SketchEventHandler(s, width, height);
    }

    public initialize = () => {
        console.log('SketchComponentManager: Initializing component manager');

        for (const component of this.components) {
            if (this.isInteractive(component)) {
                this.eventHandler.addComponent(component);
            }
        }
        this.eventHandler.updateCollisionMap();
    };

    public isInteractive = (component: SketchComponent | IInteractiveComponent): component is IInteractiveComponent => {
        return (component as IInteractiveComponent).onClick !== undefined;
    };

    public addComponent = (component: SketchComponent) => {
        this.components.push(component);
    };

    public addComponents = (components: SketchComponent[]) => {
        for (const component of components) {
            this.addComponent(component);
        }
    };

    public renderComponents = () => {
        for (const component of this.components) {
            component.render();
        }

        if (this.requireResize) {
            this.timeSinceResizeRequest += this.s.deltaTime;
            if (this.timeSinceResizeRequest >= this.resizeDebounceTime) {
                this.requireResize = false;
                this.timeSinceResizeRequest = 0;
                this.resizeCanvas();
            }
        }

        // if (this.debugMode) {
        //   this.debugHitBoxes();
        // }
    };

    public resizeCanvas() {
        for (const component of this.components) {
            component.handleResize(this.width, this.height);
        }
        this.eventHandler.handleCanvasResize(this.width, this.height);
    }

    public handleCanvasResize = (width: number, height: number) => {
        this.width = width;
        this.height = height;
        this.requireResize = true;
        this.timeSinceResizeRequest = 0;
    };

    public handleClick = (clickEvent: ClickEvent) => {
        this.eventHandler.handleClick(clickEvent);
    };

    public handleHover = (clickEvent: ClickEvent) => {
        this.eventHandler.handleHover(clickEvent);
    };

    public handleMouseDrag = (dragEvent: DragMouseEvent) => {
        this.eventHandler.handleMouseDrag(dragEvent);
    };

    // public enableDebugMode = (state: boolean) => {
    //   this.debugMode = state;
    // };

    // public debugHitBoxes = () => {
    //   this.eventHandler.debugHitBoxes();
    // };
}
