import {KeyboardService} from "../core/keyboard/services/keyboard.service";
import {KeyboardServiceDom} from "./keyboard/services/keyboard.service.dom.js";
import {MusicService} from "../core/musics/services/music.service";
import {MusicServiceDom} from "./musics/services/music.service.dom.js";
import {SoundService} from "../core/sounds/services/sound.service";
import {SoundServiceDom} from "./sound/services/sound.service.dom.js";
import {SpriteService} from "../core/sprites/services/sprite.service";
import {SpriteServiceDom} from "./sprites/services/sprite.service.dom.js";
import {MusicHandleFirstClick} from "../core/musics/services/music.handle-first-click";
import {MusicHandlerFirstClickDom} from "./musics/services/music.handle-first-click.dom.js";
import {RenderService} from "../core/render/services/render.service";
import {RenderServiceDom} from "./render/services/render.service.dom.js";
import {SceneManager} from "../core/scenes/scene-manager.js";

export class GameComponent {

    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D | null;

    keyboardService: KeyboardService = new KeyboardServiceDom()
        .initialize();
    musicService: MusicService = new MusicServiceDom();
    soundService: SoundService = new SoundServiceDom();
    spriteService: SpriteService<HTMLImageElement> = new SpriteServiceDom();
    handlerFirstClickForMusic: MusicHandleFirstClick;
    renderService: RenderService<HTMLImageElement>;

    sceneManager: SceneManager<HTMLImageElement>;

    // TODO : a bouger et nettoyer
    lastTime: number = 0;


    constructor() {
        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.canvasCtx = this.canvas.getContext("2d");
        this.handlerFirstClickForMusic = new MusicHandlerFirstClickDom("btnMusic", this.musicService);
        this.renderService = new RenderServiceDom(this.canvas, this.canvasCtx);
        this.sceneManager = new SceneManager(
            this.keyboardService,
            this.soundService,
            this.spriteService,
            this.renderService
        );
    }

    init(): void {
        // INFO : on ne peut pas lancer de musique sans une premiere intervention utilisateur.
        this.handlerFirstClickForMusic.handleClickMusicButton();
    }

    run(timestamp: number) {
        this.update(timestamp);
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    private update(timestamp: number): void {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.sceneManager.update(deltaTime);
    }

    private draw(): void {
        this.renderService.clearScreen();
        this.sceneManager.draw();
    }
}