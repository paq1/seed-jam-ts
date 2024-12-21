import {SpriteModel} from "./models/sprite.model";
import {RenderService} from "../render/services/render.service";
import Vector2D from "../datas/vecteur2d.js";
import {AnimationType} from "./enum/animation.enum.js";

export class SpriteAnimated<IMAGE> {

    ptrSprite: SpriteModel<IMAGE>;
    indexCurrentFrame: number = 0;
    indexDefaultAnimation: number = 0;
    indexCurrentAnimation: number;
    animationTimer?: number;


    constructor(
        private renderService: RenderService<IMAGE>,
        sprite: SpriteModel<IMAGE>,
    ) {
        this.ptrSprite = sprite;
        this.indexCurrentAnimation = this.indexDefaultAnimation;
    }

    animate(dt: number, idAnimation: number, speedSecs: number = 0.1): void {

        if (!this.animationTimer) {
            this.animationTimer = 0;
            this.indexCurrentAnimation = idAnimation;
        }

        this.animationTimer += dt;

        if (this.animationTimer >= speedSecs) {
            if (this.ptrSprite.animationFrame) {
                const animationFrame = this.ptrSprite.animationFrame;
                this.indexCurrentFrame = (this.indexCurrentFrame + 1) % animationFrame;
            }
            this.animationTimer = 0;
        }
    }

    stopAnimation(): void {
        this.animationTimer = undefined;
        this.indexCurrentFrame = 0;
    }

    draw(position: Vector2D, size: Vector2D): void {

        const spriteKind: AnimationType = this.ptrSprite.animationType;

        if (spriteKind !== AnimationType.NONE) {
            const widthOneFrame = this.ptrSprite.widthOneFrame || 100;
            const heightOneFrame = this.ptrSprite.heightOneFrame || 100;

            const isVectical = spriteKind === AnimationType.VERTICAL;

            const sourceX = isVectical ? this.indexCurrentAnimation * widthOneFrame : this.indexCurrentFrame * widthOneFrame;
            const sourceY = isVectical ? this.indexCurrentFrame * heightOneFrame : this.indexCurrentAnimation * heightOneFrame;

            this.renderService.drawFromSpriteSheet(
                this.ptrSprite,
                position,
                size,
                {x: sourceX, y: sourceY},
                {x: widthOneFrame, y: heightOneFrame},
            );
        }
    }
}