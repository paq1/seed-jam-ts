import { SpriteModel } from "../../../core/sprites/models/sprite.model";
import {SpriteService} from "../../../core/sprites/services/sprite.service";

export class SpriteServiceDom implements SpriteService<HTMLImageElement> {

    sprites: Record<string, SpriteModel<HTMLImageElement>>;

    constructor() {

        const spritesPath = "assets/sprites";

        const playerImage = new Image();
        playerImage.src = `${spritesPath}/player.png`;
        const enemyImage = new Image();
        enemyImage.src = `${spritesPath}/enemy.png`;

        this.sprites = {
            "player": {
                image: playerImage
            },
            "enemy": {
                image: enemyImage,
            }
        }
    }

    getFromId(id: string): SpriteModel<HTMLImageElement> | undefined {
        return this.sprites[id];
    }
}