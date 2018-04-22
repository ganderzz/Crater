import Crater from "./Crater";
import { Rectangle } from "./Shapes";
import { Keyboard } from "./Events/Keyboard";

window.onload = () => {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas");

    const rect = new Rectangle({
        x: 20,
        y: 20,
        height: 20,
        width: 20,
        fillColor: "pink"
    });

    new Crater(canvas).run((ctx, events) => {
        if (events.isKeyDown(Keyboard.d)) {
            rect.x += 1;
        }
        if (events.isKeyDown(Keyboard.a)) {
            rect.x -= 1;
        }
        if (events.isKeyDown(Keyboard.w)) {
            rect.y -= 1;
        }
        if (events.isKeyDown(Keyboard.s)) {
            rect.y += 1;
        }

        ctx.add(rect);
    });
}