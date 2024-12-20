import {KeyboardService} from "../core/keyboard/services/keyboard.service.js";
import {KeyboardServiceDom} from "./keyboard/services/keyboard.service.dom.js";
import {MusicService} from "../core/musics/services/music.service.js";
import {MusicServiceDom} from "./musics/services/music.service.dom.js";
import {SoundService} from "../core/sounds/services/sound.service.js";
import {SoundServiceDom} from "./sound/services/sound.service.dom.js";
import {SpriteService} from "../core/sprites/services/sprite.service.js";
import {SpriteServiceDom} from "./sprites/services/sprite.service.dom.js";
import {MusicHandleFirstClick} from "../core/musics/services/music.handle-first-click.js";
import {MusicHandlerFirstClickDom} from "./musics/services/music.handle-first-click.dom.js";
import {ModelPlayer} from "../core/gameelements/player/models/model.player.js";
import Vector2D from "../core/datas/vecteur2d.js";

export class GameComponent {

    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D | null;

    keyboardService: KeyboardService = new KeyboardServiceDom()
        .initialize();
    musicService: MusicService = new MusicServiceDom();
    soundService: SoundService = new SoundServiceDom();
    spriteService: SpriteService<HTMLImageElement> = new SpriteServiceDom();
    handlerFirstClickForMusic: MusicHandleFirstClick;


    // TODO : a bouger et nettoyer
    lastTime: number = 0;
    player: ModelPlayer = {
        position: new Vector2D(50, 50),
        speed: 200,
    }
    isMoving = false;


    constructor() {
        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.canvasCtx = this.canvas.getContext("2d");
        this.handlerFirstClickForMusic = new MusicHandlerFirstClickDom("btnMusic", this.musicService);
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

    // TODO (nice): isoler dans un service (logique du jeu)
    private update(timestamp: number): void {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.isMoving = false;

        if (this.keyboardService.isKeyPressed("ArrowRight")) {
            this.player.position.x += this.player.speed * deltaTime;
            this.isMoving = true;
        }
        if (this.keyboardService.isKeyPressed("ArrowLeft")) {
            this.player.position.x -= this.player.speed * deltaTime;
            this.isMoving = true;
        }
        if (this.keyboardService.isKeyPressed("ArrowUp")) {
            this.player.position.y -= this.player.speed * deltaTime;
            this.isMoving = true;
        }
        if (this.keyboardService.isKeyPressed("ArrowDown")) {
            this.player.position.y += this.player.speed * deltaTime;
            this.isMoving = true;
        }

        if (this.isMoving) {
            this.soundService.playSound("step", { volume: 0.3 });
        }
    }


    // TODO (nice): isoler dans un service (logique d'affichage)
    private draw(): void {
        if (this.canvasCtx) {
            this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Efface le canvas

            const spritePlayer = this.spriteService.getFromId("player")?.image;
            const spriteEnemy = this.spriteService.getFromId("enemy")?.image;

            if (spritePlayer) {
                if (spritePlayer.complete) {
                    this.canvasCtx.drawImage(spritePlayer, this.player.position.x, this.player.position.y, 50, 50);
                }
            }

            if (spriteEnemy) {
                if (spriteEnemy.complete) {
                    this.canvasCtx.drawImage(spriteEnemy, 300, 200, 50, 50);
                }
            }
        }
    }
}