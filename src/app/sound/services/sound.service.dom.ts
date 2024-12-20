import {SoundService} from "../../../core/sounds/services/sound.service";
import {SoundboxModel} from "../../../core/sounds/models/soundbox.model";
import {SoundConfigModel} from "../../../core/sounds/models/sound-config.model";

export class SoundServiceDom implements SoundService {

    soundbox: SoundboxModel<HTMLAudioElement>;
    currentId?: string;

    constructor() {

        const soundsPath = "assets/sounds";

        this.soundbox = {
            sounds: {
                "step": new Audio(`${soundsPath}/move.wav`)
            }
        }

    }

    playSound(id: string, options?: SoundConfigModel): void {

        const sound = this.getSound(id);
        if (sound) {
            sound.loop = false;

            if (options?.volume) {
                sound.volume = options.volume;
            }

            sound
                .play()
                .then((_) => this.currentId = id)
                .catch((err: Error) => {
                console.log(err);
            })
        }
    }

    private getSound(id: string): HTMLAudioElement | undefined {
        return this.soundbox.sounds[id]
    }

}