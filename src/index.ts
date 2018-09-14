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
    const ct = new Crater(canvas);

    let i = 500;
    while(i--) {
        const r = new Rectangle({
            x: i,
            y: i % 50,
            height: 4,
            width: 4,
            fillColor: "blue"
        }); 

        ct.add(r);
    }

    ct.add(rect);

    ct.runEventLoop((events) => {
        const x = rect.get<number>("x");
        const y = rect.get<number>("y");

        if (events.isKeyDown(Keyboard.d)) {
            rect.set("x", x + 1);
        }
        if (events.isKeyDown(Keyboard.a)) {
            rect.set("x", x - 1);
        }
        if (events.isKeyDown(Keyboard.w)) {
            rect.set("y", y - 1);
        }
        if (events.isKeyDown(Keyboard.s)) {
            rect.set("y", y + 1);
        }
    });
}