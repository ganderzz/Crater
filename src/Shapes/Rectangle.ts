import { IShape } from "./IShape";
import BaseShape from "./BaseShape";

type PropertyType = "x" | "y" | "width" | "height" | "fillColor" | "strokeColor";

export default class Rectangle extends BaseShape implements IShape {
  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;

  private fillColor: string = "#000";
  private strokeColor: string = "transparent";

  public constructor(obj?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fillColor?: string;
    strokeColor?: string;
  }) {
    super();

    if (obj) {
      const keys = Object.keys(obj);

      keys.forEach(k => {
        this[k] = obj[k];
      });
    }
  }

  public set(property: PropertyType, value: string | number) {
    if (this[property]) {
      this[property] = value;
      this.isDirty = true;
    }
  }

  public get<T>(property: PropertyType): T {
    return this[property] as any;
  }

  public clearArea(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  public draw(context: CanvasRenderingContext2D): boolean {
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
