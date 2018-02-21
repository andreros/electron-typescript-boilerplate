import { BrowserWindow } from "electron";

export class Window {

    public static getWindow = (title: string, width: number, height: number, target: string): BrowserWindow => {

        // create a new window
        let window = new BrowserWindow({
            title: title,
            width: width,
            height: height
        });

        // load html into window
        window.loadURL("file://" + __dirname + "/" + target);

        // garbage collection handle
        window.on("close", function () {
            window = null;
        });

        return window;
    }

}
