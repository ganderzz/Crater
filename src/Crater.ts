import Context from "./Context/Context";
import KeyboardHandler from "./Events/KeyboardHandler";

export default class Crater {
  public constructor(canvas: HTMLCanvasElement) {
    if (!canvas || !canvas.getContext) {
      console.error(
        `Invalid canvas element passed into the constructor of Crater.`
      );
      return;
    }

    this._context = new Context(canvas.getContext("2d"));
    this._keyHandler = new KeyboardHandler();
  }

  public run = (
    action: (
      context: Context,
      events: KeyboardHandler,
      deltaTime: number
    ) => void
  ) => {
    this.animationId = requestAnimationFrame(() =>
      this.runAllEvents(() => action(this._context, this._keyHandler, 0))
    );
  };

  private runAllEvents = (
    action: (
      context: Context,
      events: KeyboardHandler,
      deltaTime: number
    ) => void
  ) => {
    requestAnimationFrame(() => this.runAllEvents(action));

    const now = Date.now();
    const delta = now - this.previousTime;

    this._context.context.clearRect(0, 0, 99999, 99999);

    if (action) {
      action(this._context, this._keyHandler, delta);
    }

    if (delta > this.interval) {
      this.previousTime = now - delta % this.interval;
    }
  };

  private renderQueue = null;
  private readonly _context: Context;
  private readonly _keyHandler: KeyboardHandler;
  private animationId: number;

  private previousTime: number = Date.now();
  private interval: number = 1000 / 30;
}
