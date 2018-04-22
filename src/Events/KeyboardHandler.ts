import { Keyboard } from "./Keyboard";

export default class KeyboardHandler {
  public constructor() {
    window.addEventListener("keypress", this.handleKeyDown);
    window.addEventListener("keyup", this.reset);
  }

  public dispose() {
    window.removeEventListener("keypress", this.handleKeyDown);
    window.removeEventListener("keyup", this.reset);
  }

  public isKeyDown = (key: Keyboard): boolean => {
    if (this.keysDown.indexOf(key) >= 0) {
      return true;
    }

    return false;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    this.keysDown = [...this.keysDown, event.key];
  };

  private reset = (event: KeyboardEvent) => {
    this.keysDown = this.keysDown.filter(k => k !== event.key);
  };

  private keysDown: string[] = [];
}
