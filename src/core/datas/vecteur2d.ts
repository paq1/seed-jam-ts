
export default class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static equals(a: Vector2D, b: Vector2D): boolean {
        return a.x === b.x && a.y === b.y;
    }
}
