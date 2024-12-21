import {SpriteModel} from "../../../core/sprites/models/sprite.model";
import {SpriteService} from "../../../core/sprites/services/sprite.service";
import {AnimationType} from "../../../core/sprites/enum/animation.enum.js";

export class SpriteServiceDom implements SpriteService<HTMLImageElement> {

    sprites: Record<string, SpriteModel<HTMLImageElement>>;

    constructor() {

        const spritesPath = "assets/sprites";

        const playerImage = new Image();
        playerImage.src = `${spritesPath}/player.png`;
        const enemyImage = new Image();
        enemyImage.src = `${spritesPath}/enemy.png`;
        const snakeSpritesSheetImage = new Image();
        snakeSpritesSheetImage.src = `${spritesPath}/snake-sprites-sheet.png`;

        this.sprites = {
            "player": {
                image: playerImage,
                animationType: AnimationType.NONE,
            },
            "enemy": {
                image: enemyImage,
                animationType: AnimationType.NONE
            },
            "snake-sprites-sheet": {
                image: snakeSpritesSheetImage,
                animationType: AnimationType.VERTICAL,
                nbAnimations: 4,
                animationFrame: 4,
                widthOneFrame: 16,
                heightOneFrame: 16,
            }
        }
    }

    getFromIdUnsafe(id: string): SpriteModel<HTMLImageElement> {
        return this.sprites[id];
    }

    getFromId(id: string): SpriteModel<HTMLImageElement> | undefined {
        try {
            return this.sprites[id];
        } catch (e) {
            return undefined;
        }
    }
}