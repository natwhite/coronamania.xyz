import {EventEmitter} from 'events';
import {Functions} from '../Functions';
import {ITransform} from '../ITransform';

export class ColorArrayTransitions implements ITransform<number[]> {

    public state = [0, 0, 0];
    public onComplete: EventEmitter = new EventEmitter();
    private readonly colors: Array<[number, number, number]>;
    private currentColorIndex: number;
    private statePercent: number = 0;
    private currentColor: [number, number, number];
    private nextColor: [number, number, number];
    private delta: number;

    constructor(colors: Array<[number, number, number]>, framesPerCycle = 60) {
        this.colors = colors;
        this.currentColorIndex = 0;
        this.currentColor = colors[0];
        this.nextColor = colors[1];
        this.statePercent = 0;
        this.delta = 100 / framesPerCycle;
    }

    public nextState = () => {
        this.statePercent += this.delta;

        if (this.statePercent >= 100) {
            this.statePercent = 0;
            this.currentColorIndex++;
            this.currentColorIndex %= this.colors.length;
            this.currentColor = this.colors[this.currentColorIndex];
            this.nextColor = this.colors[(this.currentColorIndex + 1) % this.colors.length];
        }

        return Functions.lerpColor(this.currentColor, this.nextColor, this.statePercent / 100);
    };
}
