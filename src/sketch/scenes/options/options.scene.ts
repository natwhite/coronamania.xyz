import {EventEmitter} from 'events';
import {Scene} from '../../core/Scene';
import {BackButtonComponent} from './components/backButton.component';
import {CreditsComponent} from './components/credits.component';
import {OptionsTitleComponent} from './components/optionsTitle.component';

export class OptionsScene extends Scene {
    public onClick: EventEmitter = new EventEmitter();

    constructor(s: any, width: number, height: number) {
        super(s, width, height);
        const backButtonComponent = new BackButtonComponent(s, this.width, this.height);
        backButtonComponent.onInteraction.on('click', () => {
            console.log(`Got click from backButton`);
            this.onClick.emit('transition');
        });
        this.componentManager.addComponents([
            new OptionsTitleComponent(s, this.width, this.height),
            // new VolumeComponent(s, this.width, this.height),
            new CreditsComponent(s, this.width, this.height),
            backButtonComponent
        ]);
    }
}
