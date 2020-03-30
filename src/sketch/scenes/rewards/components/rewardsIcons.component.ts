import {SketchComponent} from '../../../core/SketchComponent';

export class RewardsIconsComponent extends SketchComponent {

    private iconSize = 100;
    private iconPadding = 15;
    private iconRows = 5;
    private iconColumns = 5;
    private readonly sectionWidth: number;
    private readonly sectionHeight: number;

    constructor(s: any, w: number, h: number) {
        super(s, w, h, true, s.P2D);
        this.sectionHeight = (this.iconSize + this.iconPadding) * this.iconRows - this.iconPadding;
        this.sectionWidth = (this.iconSize + this.iconPadding) * this.iconColumns - this.iconPadding;
    }

    public createGraphic = () => {
        this.renderer.push();
        this.renderer.translate(this.width / 2, this.height / 2);
        this.renderer.noStroke();
        this.renderer.fill(255);
        for (let y = -this.sectionHeight / 2; y < this.sectionHeight / 2; y += (this.iconSize + this.iconPadding)) {
            for (let x = -this.sectionWidth / 2; x < this.sectionWidth / 2; x += (this.iconSize + this.iconPadding)) {
                this.renderer.rect(x, y, this.iconSize, this.iconSize);
            }
        }
        this.renderer.pop();
    };
}
