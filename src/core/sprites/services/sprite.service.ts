import {SpriteModel} from "../models/sprite.model";

export interface SpriteService<IMAGE> {
    getFromId(id: string): SpriteModel<IMAGE> | undefined;
}