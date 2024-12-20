import {MusicHandleFirstClick} from "../../../core/musics/services/music.handle-first-click";
import {MusicService} from "../../../core/musics/services/music.service";

export class MusicHandlerFirstClickDom implements MusicHandleFirstClick {

    constructor(private btnId: string, private musicService: MusicService) {}

    handleClickMusicButton(): void {
        const btnMusique = document.getElementById(this.btnId);

        if (btnMusique) {
            btnMusique.addEventListener("click", (e) => {
                this.musicService.startMusique("bird", { volume: 0.5, isMuted: false })
            });
        }
    }
}