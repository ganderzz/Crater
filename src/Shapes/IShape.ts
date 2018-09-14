export interface IShape {
    isDirty: boolean;

    draw(context: CanvasRenderingContext2D): boolean;
    clearArea(ctx: CanvasRenderingContext2D);
}