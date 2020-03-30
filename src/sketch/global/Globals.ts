import * as p5 from "p5";

export interface AnimationImages {
    idle: p5.Image,
    success: p5.Image,
    fail: p5.Image,
}

export class Globals {
    public static font: p5.Font;
    public static lock: p5.Image;
    public static palletSecondary = [
        [193, 155, 247],
        [228, 229, 138],
        [133, 232, 215],
        [234, 152, 214],
        [244, 143, 143],
    ];
    public static palletPrimary = [
        [255, 72, 196],
        [43, 209, 252],
        [243, 234, 95],
        [192, 77, 249],
        [255, 63, 63],
    ];
    static bathroom: p5.Image;
    static classroom: p5.Image;
    static hallway: p5.Image;
    static corona: p5.Image;
    static turtleImages: AnimationImages;

    static chill: HTMLAudioElement;
    static ravel: HTMLAudioElement;
    static elevator: HTMLAudioElement;
    static ditty: HTMLAudioElement;
    static volume: number;
    static coronaModel: p5.Geometry;
}
