import {EventEmitter} from 'events';
import {Scene} from '../../core/Scene';
import {BackButtonComponent} from './components/backButton.component';
import {LevelSelectBanner} from './components/levelSelectBanner';
import {LevelSelectButtonComponent} from './components/levelSelectButton.component';
import {LevelSelectTitleComponent} from './components/levelSelectTitle.component';
import {Globals} from "../../global/Globals";

export class LevelSelectScene extends Scene {
    public onClick: EventEmitter = new EventEmitter();

    private levelMargin = 16;

    private levels = ['Turtle Boogie!!!', 'Maid Monkey', 'Fins Off', 'Six Waddles Away', 'Flipper Washing'];
    private stages = ['One', 'Two', 'Three', 'Four', 'Five'];
    private levelColors = [
        [
            Globals.palletPrimary[0],
            Globals.palletSecondary[0],
            Globals.palletSecondary[1],
            Globals.palletSecondary[2],
            Globals.palletSecondary[3],
            Globals.palletSecondary[4],
        ],
        [
            Globals.palletPrimary[1],
            Globals.palletSecondary[4],
            Globals.palletSecondary[0],
            Globals.palletSecondary[1],
            Globals.palletSecondary[2],
            Globals.palletSecondary[3],
        ],
        [
            Globals.palletPrimary[2],
            Globals.palletSecondary[3],
            Globals.palletSecondary[4],
            Globals.palletSecondary[0],
            Globals.palletSecondary[1],
            Globals.palletSecondary[2],
        ],
        [
            Globals.palletPrimary[3],
            Globals.palletSecondary[2],
            Globals.palletSecondary[3],
            Globals.palletSecondary[4],
            Globals.palletSecondary[0],
            Globals.palletSecondary[1],
        ],
        [
            Globals.palletPrimary[4],
            Globals.palletSecondary[1],
            Globals.palletSecondary[2],
            Globals.palletSecondary[3],
            Globals.palletSecondary[4],
            Globals.palletSecondary[0],
        ],
    ];

    private lockedLevels = [
        [false, false, false, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
    ];

    constructor(s: any, width: number, height: number) {
        super(s, width, height);
        const backButtonComponent = new BackButtonComponent(s, this.width, this.height);
        backButtonComponent.onInteraction.on('click', () => {
            this.onClick.emit('transition');
        });
        this.componentManager.addComponents([
            new LevelSelectTitleComponent(s, this.width, this.height),
            backButtonComponent
        ]);

        const bannerAndStageDelta = 140;
        let lastYOffset = -370;

        for (const level of this.levels.map((l, i) => ({level: l, colors: this.levelColors[i], locked: this.lockedLevels[i]}))) {
            this.createLevel(lastYOffset += bannerAndStageDelta, level.level, this.stages, level.colors, level.locked);
        }
    }

    private createLevel(yOffset: number, levelName: string, stages: string[], color: number[][], locked: boolean[]) {
        this.s.textSize(40);
        const totalTextWidth = stages.map((l) => this.s.textWidth(l)).reduce((a, b) => a + b);
        const totalLevelSpan = totalTextWidth + (stages.length - 1) * this.levelMargin;
        let lastSpace = -(totalLevelSpan / 2);
        const halfSpacing = (text: string) => (this.s.textWidth(text) / 2 + this.levelMargin / 2);
        const buttonSpacing: number[] = [];
        for (const level of stages) {
            lastSpace += halfSpacing(level);
            buttonSpacing.push(lastSpace);
            lastSpace += halfSpacing(level);
        }

        const buttons = stages.map(
            (label, i) => new LevelSelectButtonComponent(
                this.s,
                this.width,
                this.height,
                label,
                levelName,
                color[i + 1],
                buttonSpacing[i],
                yOffset,
                locked[i]
            )
        );

        buttons.forEach(
            (c) => c.onInteraction.on(
                'click',
                (level: string, stage: string) => {
                    console.log(`Selected : ${level}-${stage}`);
                    this.onClick.emit('click', this.levels.indexOf(level), this.stages.indexOf(stage));
                }
            )
        );

        this.componentManager.addComponents(
            buttons
        );

        this.componentManager.addComponent(
            new LevelSelectBanner(
                this.s,
                this.width,
                this.height,
                levelName,
                color[0],
                600,
                0,
                yOffset - 40 * 1.5
            )
        );
    }

}
