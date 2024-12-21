import Vector2D from "../../../core/datas/vecteur2d";
import {RenderService} from "../../../core/render/services/render.service";
import {SpriteModel} from "../../../core/sprites/models/sprite.model";

export class RenderServiceDom implements RenderService<HTMLImageElement> {

    constructor(
        private canvas: HTMLCanvasElement,
        private canvasCtx: CanvasRenderingContext2D | null
    ) {
    }

    clearScreen(): void {
        this.canvasCtx?.clearRect(0, 0, this.canvas.width, this.canvas.height); // Efface le canvas
    }

    draw(sprite: SpriteModel<HTMLImageElement>, position: Vector2D, size: Vector2D): void {
        if (sprite.image.complete) {
            this.canvasCtx?.drawImage(sprite.image, position.x, position.y, size.x, size.y);
        }
    }

    drawWithAxe(sprite: SpriteModel<HTMLImageElement>, x: number, y: number, w: number, h: number): void {
        if (sprite.image.complete) {
            this.canvasCtx?.drawImage(sprite.image, x, y, w, h);
        }
    }

    drawFromSpriteSheet(
        sprite: SpriteModel<HTMLImageElement>,
        destinationPosition: Vector2D,
        destinationSize: Vector2D,
        sourcePosition: Vector2D,
        sourceSize: Vector2D,
    ): void {
        if (sprite.image.complete) {
            // ctx.drawImage(spriteSheet, sx, sy, frameWidth, frameHeight, playerX, playerY, frameWidth, frameHeight);
            this.canvasCtx?.drawImage(
                sprite.image,
                sourcePosition.x,
                sourcePosition.y,
                sourceSize.x,
                sourceSize.y,
                destinationPosition.x,
                destinationPosition.y,
                destinationSize.x,
                destinationSize.y,
            );
        }
    }
}
