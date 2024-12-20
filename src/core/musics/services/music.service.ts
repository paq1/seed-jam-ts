import {MusicConfigModel} from "../models/music-config.model";

export interface MusicService {
    startMusique(id: string, options?: MusicConfigModel): void;
    resumeMusique(): void;
    stopMusique(): void;
    setVolume(value: number): void;
}