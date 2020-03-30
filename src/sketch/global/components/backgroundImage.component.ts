import {SketchComponent} from '../../core/SketchComponent';
import * as p5 from "p5";

export class BackgroundImageComponent extends SketchComponent {
    private bgImage: p5.Image;

    constructor(s: any, width: number, height: number, image: p5.Image) {
        super(s, width, height);
        this.bgImage = image;
    }

    public createGraphic = () => {
        this.renderer.background(this.bgImage);
    };

    public setBackground(image: p5.Image) {
        this.bgImage = image;
    }
}
