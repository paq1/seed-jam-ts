import {ModelPlayer} from "../gameelements/player/models/model.player";
import Vector2D from "../datas/vecteur2d.js";
import {KeyboardService} from "../keyboard/services/keyboard.service";
import {SoundService} from "../sounds/services/sound.service";
import {RenderService} from "../render/services/render.service";
import {SpriteService} from "../sprites/services/sprite.service";
import {Scene} from "./scene";
import {SceneFin} from "./scene-fin.js";

export class SceneJeu<IMAGE> implements Scene {
    static ID_SCENE = "SceneJeu";
    identifiant: string = SceneJeu.ID_SCENE;

    player: ModelPlayer = {
        position: new Vector2D(50, 50),
        speed: 200,
    }
    isMoving = false;

    constructor(
        private keyboardService: KeyboardService,
        private soundService: SoundService,
        private spriteService: SpriteService<IMAGE>,
        private renderService: RenderService<IMAGE>
    ) {}

    reset(): void {
        this.player = {
            position: new Vector2D(50, 50),
            speed: 200,
        }
        this.isMoving = false;
    }

    update(dt: number): string | undefined {
        this.isMoving = false;

        if (this.keyboardService.isKeyPressed("ArrowRight")) {
            this.player.position.x += this.player.speed * dt;
            this.isMoving = true;
        }
        if (this.keyboardService.isKeyPressed("ArrowLeft")) {
            this.player.position.x -= this.player.speed * dt;
            this.isMoving = true;
        }
        if (this.keyboardService.isKeyPressed("ArrowUp")) {
            this.player.position.y -= this.player.speed * dt;
            this.isMoving = true;
        }
        if (this.keyboardService.isKeyPressed("ArrowDown")) {
            this.player.position.y += this.player.speed * dt;
            this.isMoving = true;
        }

        if (this.isMoving) {
            this.soundService.playSound("step", { volume: 0.3 });
        }

        // TODO : à retirer, c'est juste pour test en live.
        if (this.player.position.x > 300) {
            return SceneFin.ID_SCENE;
        }

        return;
    }

    draw(): void {
        const spritePlayer = this.spriteService.getFromId("player");
        const spriteEnemy = this.spriteService.getFromId("enemy");

        if (spritePlayer) {
            this.renderService.draw(spritePlayer, this.player.position, {x: 50, y: 50});
        }

        if (spriteEnemy) {
            this.renderService.draw(spriteEnemy, {x: 300, y: 200}, {x: 50, y: 50});
        }
    }
}