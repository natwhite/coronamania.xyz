import {EventEmitter} from 'events';
import {Functions} from '../Functions';
import {ITransform} from '../ITransform';
import {Oscillator} from './Oscillator';

export class RNGColorOscillator implements ITransform<number[]> {

    public state = [0, 0, 0];
    public onComplete: EventEmitter = new EventEmitter();
    private rOscillator: Oscillator;
    private gOscillator: Oscillator;
    private bOscillator: Oscillator;

    constructor(min = 0.3, max = 1.2) {
        const num = () => Functions.getFloatBetween(min, max);
        this.rOscillator = new Oscillator(0, 255, num());
        this.gOscillator = new Oscillator(0, 255, num());
        this.bOscillator = new Oscillator(0, 255, num());
    }

    public nextState = () => [
        this.rOscillator.nextState(),
        this.gOscillator.nextState(),
        this.bOscillator.nextState()
    ];

    public stateAtPoint = (x: number) => [
        this.rOscillator.stateAtPoint(x),
        this.gOscillator.stateAtPoint(x),
        this.bOscillator.stateAtPoint(x)
    ];
}
