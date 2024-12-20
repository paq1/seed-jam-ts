import {KeyboardService} from "../../../core/keyboard/services/keyboard.service";
import {KeyboardModel} from "../../../core/keyboard/models/keyboard.model";

export class KeyboardServiceDom implements KeyboardService {

    private keyboard: KeyboardModel;

    constructor() {
        this.keyboard = { keys: {} };
    }

    initialize(): KeyboardService {
        document.addEventListener("keydown", (e) => {
            this.keyboard.keys[e.key] = true
        });
        document.addEventListener("keyup", (e) => this.keyboard.keys[e.key] = false);
        return this;
    }

    isKeyPressed(keycode: string): boolean {
        return this.keyboard.keys[keycode];
    }

}