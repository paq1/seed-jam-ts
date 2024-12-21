import {AnimationType} from "../enum/animation.enum.js";

export interface SpriteModel<IMAGE> {
    image: IMAGE;
    animationType: AnimationType,
    nbAnimations?: number,
    animationFrame?: number,
    widthOneFrame?: number,
    heightOneFrame?: number,
}