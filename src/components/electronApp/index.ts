import { Window } from "../";

declare const window: any;
const electron = window.require("electron");
const { App, BrowserWindow, Menu, IpcMain, app } = electron;

export class ElectronApp {

    private application: Electron.App;
    private mainMenu: Electron.Menu;
    private mainWindow: Electron.BrowserWindow;
    private addWindow: Electron.BrowserWindow;

    constructor() {
        this.application = app;
        this.application.on("window-all-closed", this.onWindowAllClosed);
        this.application.on("ready", this.onReady);
    }

    private onReady = (): void => {
        this.mainWindow = Window.getWindow("Main window", 1024, 768, "index.html");
        this.mainWindow.on("close", this.onMainWindowClose);
        this.addWindow = Window.getWindow("Add new task window", 1024, 768, "addWindow.html");
        this.mainMenu = Menu.buildFromTemplate([{ label: "File" }]);
        Menu.setApplicationMenu(this.mainMenu);
    }

    private onMainWindowClose = (): void => {
        this.application.quit();
    }

    private onWindowAllClosed = (): void => {
        this.application.quit();
    }

}
