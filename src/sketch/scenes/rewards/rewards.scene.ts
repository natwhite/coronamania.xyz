import {EventEmitter} from 'events';
import {Scene} from '../../core/Scene';
import {BackButtonComponent} from './components/backButton.component';
import {RewardsIconsComponent} from './components/rewardsIcons.component';
import {RewardsTitleComponent} from './components/RewardsTitle.component';

export class RewardsScene extends Scene {
    public onClick: EventEmitter = new EventEmitter();

    constructor(s: any, width: number, height: number) {
        super(s, width, height);
        const backButtonComponent = new BackButtonComponent(s, this.width, this.height);
        backButtonComponent.onInteraction.on('click', () => {
            console.log(`Got click from backButton`);
            this.onClick.emit('transition');
        });
        this.componentManager.addComponents([
            new RewardsTitleComponent(s, this.width, this.height),
            new RewardsIconsComponent(s, this.width, this.height),
            backButtonComponent
        ]);
    }
}
