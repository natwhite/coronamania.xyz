import {SketchComponent} from '../../../core/SketchComponent';
import {Globals} from "../../../global/Globals";

export class CoronaGraphicComponent extends SketchComponent {
    private image: any;
    private rotation: number;
    private rotationSpeed: number;

    constructor(s: any, w: number, h: number) {
        super(s, w, h, true, s.P2D);

        this.image = Globals.corona;
        this.rotation = 0;
        this.rotationSpeed = 0.006;
    }

    public createGraphic = () => {
        this.renderer.push();
        this.renderer.translate(this.width * 0.5, this.height * 0.5);
        this.renderer.rotate(this.rotation += this.rotationSpeed);
        this.renderer.imageMode(this.renderer.CENTER);
        this.renderer.image(this.image, 0, 0, 400, 400);
        this.renderer.pop();
    };
}
