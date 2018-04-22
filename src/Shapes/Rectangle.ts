import { IShape } from "./IShape";

export default class Rectangle implements IShape {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  public fillColor: string = "#000";
  public strokeColor: string = "transparent";

  public constructor(obj?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fillColor?: string;
    strokeColor?: string;
  }) {
    if (obj) {
      const keys = Object.keys(obj);

      keys.forEach(k => {
        this[k] = obj[k];
      });
    }
  }

  draw(context: CanvasRenderingContext2D): boolean {
    try {
      context.fillStyle = this.fillColor;
      context.strokeStyle = this.strokeColor;
      context.fillRect(this.x, this.y, this.width, this.height);
      return true;
    } catch {
      return false;
    }
  }
}
