import { IShape } from "../Shapes";

export default class Context {
    public constructor(readonly context: CanvasRenderingContext2D) {}

    public add(shape: IShape) {
        shape.draw(this.context);
    }
}