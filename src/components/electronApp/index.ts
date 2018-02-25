
import { App, BrowserWindow, Menu, IpcMain, app } from 'electron';
import { MainMenu } from '../mainMenu';
import { Window } from '../window';

export class ElectronApp {

    private application: Electron.App;
    private mainMenu: Electron.Menu;
    private mainWindow: Electron.BrowserWindow;
    private addWindow: Electron.BrowserWindow;

    constructor() {
        this.application = app;
        this.application.on('window-all-closed', this.onWindowAllClosed);
        this.application.on('ready', this.onReady);
    }

    private onReady = (): void => {
        this.mainWindow = Window.getWindow({
            width: 1366,
            height: 768,
            target: 'index.html'
        });
        this.mainWindow.on('close', this.onMainWindowClose);
        this.mainMenu = Menu.buildFromTemplate(MainMenu.getMainMenu(this.application));
        Menu.setApplicationMenu(this.mainMenu);
    }

    private onMainWindowClose = (): void => {
        this.application.quit();
    }

    private onWindowAllClosed = (): void => {
        this.application.quit();
    }

}
