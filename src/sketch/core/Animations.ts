import {Oscillator} from './transforms/Oscillator';

export interface IAnimation {
  nextState(): void;
}

// TODO : Either merge with ITransforms or separate functionality.
export class ShrinkGrow implements IAnimation {
  public oscillator: Oscillator;
  public s: any;

  constructor(s: any, min: number, max: number, cyclesPerSecond: number) {
    this.s = s;
    this.oscillator = new Oscillator(min, max, cyclesPerSecond);
  }

  public nextState() {
    this.s.scale(this.oscillator.nextState());
  }
}
