export interface KeyboardService {
    initialize(): KeyboardService;
    isKeyPressed(keycode: string): boolean;
}