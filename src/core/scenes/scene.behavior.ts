export interface SceneBehavior {
    // retourne la prochaine scene ou rien si toujours la meme scene
    update(dt: number): string | undefined;
    draw(): void;
}