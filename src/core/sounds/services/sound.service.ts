import {SoundConfigModel} from "../models/sound-config.model";

export interface SoundService {
    playSound(id: string, options?: SoundConfigModel): void;
}