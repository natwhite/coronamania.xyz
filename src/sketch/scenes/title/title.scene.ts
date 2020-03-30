import {EventEmitter} from 'events';
import {Scene} from '../../core/Scene';
import {CoronaGraphicComponent} from './components/coronaGraphic.component';
import {LogoComponent} from './components/logo.component';
import {StartButtonComponent} from './components/startButton.component';
import {RotatingGraphicComponent} from "./components/rotatingGraphic.component";

export class TitleScene extends Scene {
    public onClick: EventEmitter = new EventEmitter();

    constructor(s: any, width: number, height: number) {
        super(s, width, height);
        const startButton = new StartButtonComponent(s, this.width, this.height);
        startButton.onInteraction.on('click', () => {
            this.onClick.emit('transition');
        });

        this.componentManager.addComponents([
            // new RotatingGraphicComponent(s, this.width, this.height),
            new CoronaGraphicComponent(s, this.width, this.height),
            new LogoComponent(s, this.width, this.height),
            startButton
        ]);
    }
}
