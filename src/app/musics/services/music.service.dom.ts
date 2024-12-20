import {MusicService} from "../../../core/musics/services/music.service.js";
import {JukeboxModel} from "../../../core/musics/models/jukebox.model.js";
import {MusicConfigModel} from "../../../core/musics/models/music-config.model";

export class MusicServiceDom implements MusicService {

    jukebox: JukeboxModel<HTMLAudioElement>
    currentId?: string;

    constructor() {

        const musicsPath = "assets/musics";

        this.jukebox = {
            musics: {
                "bird": new Audio(`${musicsPath}/musique.wav`),
            }
        }
    }

    startMusique(id: string, options?: MusicConfigModel): void {
        const music = this.getMusic(id);
        if (music) {
            music.loop = true;

            if (options?.volume) {
                music.volume = options.volume;
            }
            if (options?.isMuted) {
                music.muted = options.isMuted;
            }

            music
                .play()
                .then((_) => this.currentId = id)
                .catch((err: Error) => {
                console.log(err);
            })
        }
    }
    resumeMusique(): void {
        // TODO: check if is possible
        if (this.currentId) {
            this.startMusique(this.currentId);
        }
    }
    stopMusique(): void {
        if (this.currentId) {
            const music = this.getMusic(this.currentId);
            if (music) {
                music.pause();
            }
        }
    }
    setVolume(value: number): void {

        if (this.currentId) {
            const music = this.getMusic(this.currentId);
            if (music) {
                music.volume = value;
            }
        }
    }


    private getMusic(id: string): HTMLAudioElement | undefined {
        return this.jukebox.musics[id]
    }
}