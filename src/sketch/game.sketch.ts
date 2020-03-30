import {ClickEvent} from './core/event/ClickEvent';
import {DragMouseEvent} from './core/event/DragMouseEvent';
import {SceneTransitionManager, TransitionDirectionType, TransitionType} from './core/SceneTransitionManager';
import {BackgroundGraphics} from './global/components/backgroundGraphics.component';
import {LevelSelectScene} from './scenes/levelSelect/levelSelect.scene';
import {OptionsScene} from './scenes/options/options.scene';
import {RewardsScene} from './scenes/rewards/rewards.scene';
import {TitleScene} from './scenes/title/title.scene';
import {Globals} from "./global/Globals";
import {TurtleBoogieScene} from "./scenes/levels/turtleBoogie/turtleBoogie.scene";

// Going to need a way to import, obj files.
// TODO : Rewrite this whole library to meet ES6 standards.
// TODO : Create a base P5JSGame Object that handles default functionality and event creation.
export const GameSketch = (s: any) => {
    let width: number;
    let height: number;
    let canvas;
    let dragging = false;
    let dragStart: ClickEvent;
    let ready = false;
    let sceneTransitionManager: SceneTransitionManager;
    let backgroundGraphics: BackgroundGraphics;
    let scale = 1;

    s.preload = () => {
        // console.log(`Width : ${s.windowWidth}`);
        scale = Math.min(s.windowWidth / 700, s.windowHeight / 1000);
        Globals.font = s.loadFont('assets/fonts/ttg_by_westralinc-dbnnkt8.ttf');
        Globals.lock = s.loadImage('assets/images/lock.png');
        Globals.bathroom = s.loadImage('assets/images/bathroom.jpg');
        Globals.classroom = s.loadImage('assets/images/classroom.jpg');
        Globals.hallway = s.loadImage('assets/images/hallway.jpg');
        Globals.corona = s.loadImage('assets/images/CoronaBud_FacingForward.png');
        Globals.coronaModel = s.loadModel('assets/models/CoronaBud_Mesh.obj');
        Globals.turtleImages = {
            idle: s.loadImage('assets/images/turtle/Turtle.png'),
            fail: s.loadImage('assets/images/turtle/Turtle2.png'),
            success: s.loadImage('assets/images/turtle/Turtle3.png'),
        };

        Globals.chill = new Audio('assets/sound/IF_JamJuice_Chill.wav');
        Globals.ravel = new Audio('assets/sound/ElevatorMusic.wav');
        Globals.elevator = new Audio('assets/sound/IF_JamJuice_Ravel.wav');
        Globals.ditty = new Audio('assets/sound/8BitDitty.wav');

        Globals.volume = 0.5;
        Globals.chill.volume = Globals.volume;
        Globals.ravel.volume = Globals.volume;
        Globals.elevator.volume = Globals.volume;
        // Globals.ditty.volume = Globals.volume * 0.5;
        return;
    };

    s.setup = () => {
        // s.createCanvas(width, height, s.WEBGL);
        console.log(`Scale : ${scale}`);
        width = Math.floor(s.windowWidth / scale);
        height = Math.floor(s.windowHeight / scale);
        s.frameRate(30);

        const title = new TitleScene(s, width, height);
        const options = new OptionsScene(s, width, height);
        const rewards = new RewardsScene(s, width, height);
        const levelSelect = new LevelSelectScene(s, width, height);
        const turtleBoogie = new TurtleBoogieScene(s, width, height);

        sceneTransitionManager = new SceneTransitionManager(s, [
                title,
                options,
                rewards,
                levelSelect,
                turtleBoogie
            ],
            width,
            height
        );
        sceneTransitionManager.setTransitionOnDrag(0, 1, TransitionDirectionType.LEFT);
        sceneTransitionManager.setTransitionOnDrag(1, 0, TransitionDirectionType.RIGHT);

        sceneTransitionManager.setTransitionOnDrag(0, 2, TransitionDirectionType.RIGHT);
        sceneTransitionManager.setTransitionOnDrag(2, 0, TransitionDirectionType.LEFT);
        // TODO : Scene transitions need to be more 'snappy' rather than transitions.
        // TODO : Resize events don't trigger on unloaded scenes, nor on scene changes.
        title.onClick.on('transition', () => {
            sceneTransitionManager.transitionToScene(3, TransitionDirectionType.DOWN);
        });
        options.onClick.on('transition', () => {
            sceneTransitionManager.transitionToScene(0, TransitionDirectionType.RIGHT);
        });
        rewards.onClick.on('transition', () => {
            sceneTransitionManager.transitionToScene(0, TransitionDirectionType.LEFT);
        });
        levelSelect.onClick.on('transition', () => {
            sceneTransitionManager.transitionToScene(0, TransitionDirectionType.UP);
        });
        levelSelect.onClick.on('click', (level: number, stage: number) => {
            console.log(`Got transition to ${level} - ${stage}`);
            // TODO : Severely needs to be refactored.
            if (level === 0) {
                switch (stage) {
                    case 0:
                        turtleBoogie.setAudio(Globals.chill);
                        turtleBoogie.setBackground(Globals.bathroom);
                        break;
                    case 1:
                        turtleBoogie.setAudio(Globals.elevator);
                        turtleBoogie.setBackground(Globals.classroom);
                        break;
                    case 2:
                        turtleBoogie.setAudio(Globals.ravel);
                        turtleBoogie.setBackground(Globals.hallway);
                        break;
                }
                sceneTransitionManager.transitionToScene(4, TransitionDirectionType.FADE);
            }
        });
        turtleBoogie.onClick.on('transition', () => {
            sceneTransitionManager.transitionToScene(3, TransitionDirectionType.FADE, TransitionType.Linear);
        });

        canvas = s.createCanvas(width, height, s.WEBGL);

        canvas.mouseOver(() => {
            // console.log('GameManager: Mouse Over');
        });

        backgroundGraphics = new BackgroundGraphics(s, width, height);

        s.resizeCanvas(s.windowWidth, s.windowHeight, false);
        sceneTransitionManager.initialize();
        ready = true;

        // img = s.loadImage('../assets/CoronaMania_Vector.svg');
    };

    s.renderMouse = () => {
        s.push();
        s.translate(-width / 2, -height / 2);
        s.stroke(0);
        s.strokeWeight(10);
        s.fill(0);
        const mouse = new ClickEvent(s, width, height, scale);
        s.ellipse(mouse.x, mouse.y, 15, 15);
        if (dragging) {
            s.line(dragStart.x, dragStart.y, mouse.x, mouse.y);
            s.ellipse(dragStart.x, dragStart.y, 15, 15);
            // console.log(`Drawing line ${dragStart.x}, ${dragStart.y}`);
        }
        s.pop();
    };

    s.draw = () => {
        s.scale(scale);
        s.background(0);
        backgroundGraphics.render();
        s.renderMouse();
        if (dragging) {
            const dragMouseEvent = new DragMouseEvent(s, dragStart.x, dragStart.y, width, height, scale);
            if (Math.abs(dragMouseEvent.deltaX) + Math.abs(dragMouseEvent.deltaY) > 10) {
                sceneTransitionManager.handleMouseDrag(dragMouseEvent);
            }
        }
        sceneTransitionManager.draw();
    };

    s.mouseMoved = () => {
        if (!ready) {
            return;
        }
        sceneTransitionManager.handleHover(new ClickEvent(s, width, height, scale));
    };

    const click = () => {
        if (!ready) {
            return;
        }
        sceneTransitionManager.handleClick(new ClickEvent(s, width, height, scale));
        // if (!Globals.chill.paused) {
        //     // .isPlaying() returns a boolean
        //     Globals.chill.pause();
        // } else {
        //     Globals.chill.play();
        // }
    };

    s.mousePressed = () => {
        click();
    };

    s.touchStarted = () => {
        click();
    };

    s.touchMoved = () => {
        if (!ready) {
            return;
        }
        if (!dragging) {
            dragStart = new ClickEvent(s, width, height, scale);
        }
        dragging = true;
    };

    s.mouseReleased = () => {
        dragging = false;
        sceneTransitionManager.handleMouseRelease(new ClickEvent(s, width, height, scale));
    };

    s.keyTyped = () => {
        if (!ready) {
            return;
        }
        console.log(`Got Keypress ${s.key}`);
        if (s.key === '_') {
            // componentManager.enableDebugMode(true);
        } else if (s.key === '+') {
            // componentManager.enableDebugMode(false);
        }
    };

    s.windowResized = () => {
        if (!ready) {
            return;
        }
        // width = s.windowWidth;
        // height = s.windowHeight;
        s.resizeCanvas(s.windowWidth, s.windowHeight);

        width = Math.floor(s.windowWidth / scale);
        height = Math.floor(s.windowHeight / scale);
        backgroundGraphics.handleResize(width, height);
        sceneTransitionManager.handleCanvasResize(width, height);
    };
};
