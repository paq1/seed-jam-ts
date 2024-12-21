import {ModelPlayer} from "../gameelements/player/models/model.player";
import Vector2D from "../datas/vecteur2d.js";
import {KeyboardService} from "../keyboard/services/keyboard.service";
import {SoundService} from "../sounds/services/sound.service";
import {RenderService} from "../render/services/render.service";
import {SpriteService} from "../sprites/services/sprite.service";
import {Scene} from "./scene";
import {SceneFin} from "./scene-fin.js";
import {SpriteAnimated} from "../sprites/sprite-animated.js";

export class SceneJeu<IMAGE> implements Scene {
    static ID_SCENE = "SceneJeu";
    identifiant: string = SceneJeu.ID_SCENE;

    player: ModelPlayer = {
        position: new Vector2D(50, 50),
        speed: 200,
    }
    playerAnimation: SpriteAnimated<IMAGE>;

    constructor(
        private keyboardService: KeyboardService,
        private soundService: SoundService,
        private spriteService: SpriteService<IMAGE>,
        private renderService: RenderService<IMAGE>
    ) {
        const sprite = this.spriteService.getFromIdUnsafe("snake-sprites-sheet");
        this.playerAnimation = new SpriteAnimated(this.renderService, sprite);
    }

    reset(): void {
        this.player = {
            position: new Vector2D(50, 50),
            speed: 200,
        }
    }

    update(dt: number): string | undefined {
        this.movePlayer(dt);

        // TODO : à retirer, c'est juste pour test en live.
        if (this.player.position.x > 300) {
            return SceneFin.ID_SCENE;
        }

        return;
    }

    draw(): void {
        const spriteEnemy = this.spriteService.getFromId("enemy");
        const spritesSheetSnake = this.spriteService.getFromId("snake-sprites-sheet");

        if (spritesSheetSnake) {
            this.playerAnimation.draw(this.player.position, {x: 64, y: 64});
        }

        if (spriteEnemy) {
            this.renderService.draw(spriteEnemy, {x: 300, y: 200}, {x: 50, y: 50});
        }
    }

    private movePlayer(dt: number): void {
        const maybeNewPlayerPosition = this.maybeNewPlayerPosition(dt);
        if (maybeNewPlayerPosition) {
            const lastPlayerPosition: Vector2D = {...this.player.position};
            this.player.position = maybeNewPlayerPosition;
            this.soundService.playSound("step", { volume: 0.3 });
            this.handlePlayerAnimationUpdate(dt, lastPlayerPosition);
        } else {
            this.playerAnimation.stopAnimation();
        }
    }

    private maybeNewPlayerPosition(dt: number): Vector2D | undefined {
        let newPosition: Vector2D = {...this.player.position};

        if (this.keyboardService.isKeyPressed("ArrowRight")) {
            newPosition = {
                ...newPosition,
                x: newPosition.x + this.player.speed * dt,
            };
        }
        if (this.keyboardService.isKeyPressed("ArrowLeft")) {
            newPosition = {
                ...newPosition,
                x: newPosition.x - this.player.speed * dt,
            };
        }
        if (this.keyboardService.isKeyPressed("ArrowUp")) {
            newPosition = {
                ...newPosition,
                y: newPosition.y - this.player.speed * dt
            };
        }
        if (this.keyboardService.isKeyPressed("ArrowDown")) {
            newPosition = {
                ...newPosition,
                y: newPosition.y + this.player.speed * dt
            };
        }

        if (Vector2D.equals(this.player.position, newPosition)) {
            return;
        } else {
            return newPosition;
        }
    }

    private handlePlayerAnimationUpdate(dt: number, oldPlayerPosition: Vector2D): void {
        if (oldPlayerPosition.x < this.player.position.x) {
            this.playerAnimation.animate(dt, 3);
        } else if (oldPlayerPosition.x > this.player.position.x) {
            this.playerAnimation.animate(dt, 2);
        } else if (oldPlayerPosition.y < this.player.position.y) {
            this.playerAnimation.animate(dt, 0);
        } else if (oldPlayerPosition.y > this.player.position.y) {
            this.playerAnimation.animate(dt, 1);
        }
    }
}