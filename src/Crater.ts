import Context from "./Context/Context";
import KeyboardHandler from "./Events/KeyboardHandler";
import { IShape } from "./Shapes";

const generateUniqueId = ((i) => {
  return () => i++;
})(0);

export default class Crater {
  public constructor(canvas: HTMLCanvasElement) {
    if (!canvas || !canvas.getContext) {
      console.error(
        `Invalid canvas element passed into the constructor of Crater.`
      );
      return;
    }

    this._canvas = canvas;
    this._context = new Context(canvas.getContext("2d"));
    this._keyHandler = new KeyboardHandler();
  }

  /**
   * Handle disposing of any memory
   */
  public dispose = () => {
    this._keyHandler.dispose();
  }

  /**
   * Start and handle a render loop
   */
  public runEventLoop = (
    action: (
      events: KeyboardHandler,
      deltaTime: number
    ) => void
  ) => {
    requestAnimationFrame(() =>
      this.runAllEvents(() => action(this._keyHandler, 0))
    );
  };

  private runAllEvents = (
    action: (
      events: KeyboardHandler,
      deltaTime: number
    ) => void
  ) => {
    requestAnimationFrame(() => this.runAllEvents(action));

    const now = Date.now();
    const delta = now - this.previousTime;

    if (action) {
      action(this._keyHandler, delta);
    }

    if (delta > this.interval) {
      this.previousTime = now - delta % this.interval;

      this._objects.forEach(elem => {
        if (elem.isDirty) {
          this.render(elem);
        }
      });
    }
  };

  public render(elem: IShape) {
    const ctx = this._context.context;
    elem.clearArea(ctx);
    elem.draw(ctx);

    elem.isDirty = false;
  }

  /**
   * Add a shape to the canvas
   * 
   * @param shape 
   */
  public add(shape: IShape) {
    this._objects.set(`${generateUniqueId()}`, shape);
    this.render(shape);
  }

  private readonly _context: Context;
  private readonly _keyHandler: KeyboardHandler;
  private readonly _canvas: HTMLCanvasElement;

  private previousTime: number = Date.now();
  private interval: number = 1000 / 30;

  private _objects = new Map<string, IShape>();
}
