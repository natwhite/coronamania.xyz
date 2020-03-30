import {LevelModel} from "../level.model";
import {Globals} from "../../../global/Globals";

export class TurtleBoogieScene extends LevelModel {
    constructor(s: any, width: number, height: number) {
        super(s, width, height, Globals.bathroom, Globals.chill);
    }
}
