import {SketchComponent} from "../../core/SketchComponent";
import {PlayerAnimation} from "../../core/PlayerAnimation";


export class CharacterAnimationComponent extends SketchComponent {
    public animation: PlayerAnimation;

    constructor(s: any, width: number, height: number, animation: PlayerAnimation) {
        super(s, width, height, true, s.WEBGL);
        this.animation = animation;
    }

    public createGraphic = () => {
        this.renderer.image(this.animation.currentImage, 0, 0);
    };
}
