import {KeyboardService} from "../keyboard/services/keyboard.service";
import {SoundService} from "../sounds/services/sound.service";
import {RenderService} from "../render/services/render.service";
import {SpriteService} from "../sprites/services/sprite.service";
import {Scene} from "./scene";
import {SceneJeu} from "./scene-jeu.js";

export class SceneFin<IMAGE> implements Scene {
    static ID_SCENE = "SceneFin";
    identifiant: string = SceneFin.ID_SCENE;

    constructor(
        private keyboardService: KeyboardService,
        private soundService: SoundService,
        private spriteService: SpriteService<IMAGE>,
        private renderService: RenderService<IMAGE>
    ) {}

    update(dt: number): string | undefined {
        if (this.keyboardService.isKeyPressed(" ")) {
            return SceneJeu.ID_SCENE;
        }
        return;
    }

    draw(): void {
        const spriteEnemy = this.spriteService.getFromId("enemy");

        if (spriteEnemy) {
            this.renderService.draw(spriteEnemy, {x: 300, y: 200}, {x: 50, y: 50});
        }
    }

    reset(): void {}
}