import {EventEmitter} from "events";
import {BackButtonComponent} from "./components/backButton.component";
import {BackgroundImageComponent} from "../../global/components/backgroundImage.component";
import {Scene} from "../../core/Scene";
import * as p5 from "p5";
import {StartButtonComponent} from "../../global/components/startButton.component";
import {ClickableRegion} from "../../global/components/ClickableRegion";
import {CharacterAnimationComponent} from "../../global/components/CharacterAnimation.component";
import {Globals} from "../../global/Globals";
import {PlayerAnimation} from "../../core/PlayerAnimation";

export class LevelModel extends Scene {
    public onClick: EventEmitter = new EventEmitter();
    public audio: HTMLAudioElement;
    public backgroundComponent: BackgroundImageComponent;
    private frameStart = 0;
    private hitFrames = [];

    constructor(s: any, width: number, height: number, image: p5.Image, music: HTMLAudioElement) {
        super(s, width, height);

        this.audio = music;
        const backButtonComponent = new BackButtonComponent(s, this.width, this.height);
        backButtonComponent.onInteraction.on('click', () => {
            this.onClick.emit('transition');
            this.audio.pause();
            this.audio.currentTime = 0;
            startButton.display = true;
        });
        const startButton = new StartButtonComponent(s, this.width, this.height);
        startButton.onInteraction.on('click', () => {
            console.log('Starting');
            startButton.display = false;
            this.audio.play();
            this.frameStart = s.frameCount;
        });
        const background = new BackgroundImageComponent(s, this.width, this.height, image);
        const clickableRegion = new ClickableRegion(s, this.width, this.height, 0, 0, this.width, this.height);
        clickableRegion.onInteraction.on('click', () => {
            console.log('Got click in region');
        });
        this.backgroundComponent = background;
        this.componentManager.addComponents([
            background,
            clickableRegion,
            new CharacterAnimationComponent(s, this.width, this.height,
                new PlayerAnimation(Globals.turtleImages)
            ),
            backButtonComponent,
            startButton
        ]);
    }

    public draw = () => {
        this.componentManager.renderComponents();

    };

    setAudio(audio: HTMLAudioElement) {
        this.audio = audio;
    }

    setBackground(image: p5.Image) {
        this.backgroundComponent.setBackground(image);
    }
}
