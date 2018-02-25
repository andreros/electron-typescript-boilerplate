
import { App, BrowserWindow, Menu, IpcMain, app } from "electron";
import { Window } from "../window";

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
        this.mainWindow = Window.getWindow({
            width: 1024,
            height: 768,
            target: "index.html"
        });
        this.mainWindow.on("close", this.onMainWindowClose);
        this.mainMenu = Menu.buildFromTemplate(this.getMainMenu());
        Menu.setApplicationMenu(this.mainMenu);
    }

    private onMainWindowClose = (): void => {
        this.application.quit();
    }

    private onWindowAllClosed = (): void => {
        this.application.quit();
    }

    private getMainMenu = () => {
        const _inst = this;
        let menu = [];
        // In MacOS add an empty menu to shift the regular menu one position to the right.
        if (process.platform === "darwin") {
            menu.push({
                label: "",
                submenu: [
                    {
                        label: "Quit",
                        accelerator: process.platform === "darwin" ? "Alt+Q" : "Ctrl+Q",
                        click() {
                            _inst.application.quit();
                        }
                    }
                ]
            });
        }

        // menu
        menu.push({
            label: "Actions",
            submenu: [
                {
                    label: "Add new task",
                    accelerator: process.platform === "darwin" ? "Alt+I" : "Ctrl+I",
                    click() {
                        Window.getWindow({
                            target: "index.html"
                        });
                    }
                }
            ]
        });

        // developer tools
        if (process.env.NODE_ENV !== "production") {
            menu.push({
                label: "Developer Tools",
                submenu: [
                    {
                        role: "reload" // Podemos recargar nuestra App Commnad+R o Ctrl+R cuando tengamos cambios, es un shortcut default
                    },
                    {
                        label: "Toggle DevTools",
                        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
                        click(item: any, focusedWindow: any) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                ]
            });
        }

        return menu;
    }

}
