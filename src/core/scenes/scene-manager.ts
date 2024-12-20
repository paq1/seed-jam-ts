import {Scene} from "./scene";
import {SceneJeu} from "./scene-jeu.js";
import {KeyboardService} from "../keyboard/services/keyboard.service";
import {SoundService} from "../sounds/services/sound.service";
import {SpriteService} from "../sprites/services/sprite.service";
import {RenderService} from "../render/services/render.service";
import {SceneFin} from "./scene-fin.js";

export class SceneManager<IMAGE> {

    private scenes: Scene[]
    private ptrCurrentScene: Scene;

    constructor(
        private keyboardService: KeyboardService,
        private soundService: SoundService,
        private spriteService: SpriteService<IMAGE>,
        private renderService: RenderService<IMAGE>
    ) {
        this.scenes = [
            new SceneJeu(
                keyboardService,
                soundService,
                spriteService,
                renderService,
            ),
            new SceneFin(
                keyboardService,
                soundService,
                spriteService,
                renderService,
            )
        ];

        this.ptrCurrentScene = this.scenes[0];
    }

    update(dt: number): void {
        const idNextScene = this.ptrCurrentScene.update(dt);
        if (idNextScene) {
            const nextScene = this.scenes
                .find((scene) => scene.identifiant === idNextScene);

            if (nextScene) {
                this.ptrCurrentScene = nextScene;
                this.ptrCurrentScene.reset();
            }
        }
    }

    draw(): void {
        this.ptrCurrentScene.draw();
    }
}