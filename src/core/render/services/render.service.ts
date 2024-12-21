import Vector2D from "../../datas/vecteur2d";
import {SpriteModel} from "../../sprites/models/sprite.model";

export interface RenderService<IMAGE> {
    clearScreen(): void;
    draw(sprite: SpriteModel<IMAGE>, position: Vector2D, size: Vector2D): void;
    drawWithAxe(sprite: SpriteModel<IMAGE>, x: number, y: number, w: number, h: number): void;
    drawFromSpriteSheet(
        sprite: SpriteModel<IMAGE>,
        destinationPosition: Vector2D,
        destinationSize: Vector2D,
        sourcePosition: Vector2D,
        sourceSize: Vector2D,
    ): void;
}
