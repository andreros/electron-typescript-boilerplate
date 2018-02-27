
import { BrowserWindow, Menu, app } from 'electron';
import { MainMenu } from '../mainMenu';
import { Window } from '../window';

export class ElectronApp {

    private application: Electron.App;
    private mainWindow: Electron.BrowserWindow;
    private mainMenu: Electron.Menu;

    constructor() {
        this.application = app;
        this.application.on(this.handlers().appReady.event, this.handlers().appReady.callback);
        this.application.on(this.handlers().windowAllClosed.event, this.handlers().windowAllClosed.callback);
    }

    private handlers = (): any => {
        return {
            appReady: {
                event: 'ready',
                callback: this.onApplicationReady
            },
            mainWindowClose: {
                event: 'close',
                callback: this.onMainWindowClose
            },
            windowAllClosed: {
                event: 'window-all-closed',
                callback: this.onWindowAllClosed
            }
        };
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the application "ready" event.
     */
    private onApplicationReady = (): void => {
        this.mainWindow = Window.getWindow({
            width: 1366,
            height: 768,
            target: 'index.html'
        });
        this.mainWindow.on(this.handlers().mainWindowClose.event, this.handlers().mainWindowClose.callback);
        this.mainMenu = Menu.buildFromTemplate(MainMenu.getMainMenu(this.application));
        Menu.setApplicationMenu(this.mainMenu);
    }

    /**
     * Event handler for the main window "close" event.
     */
    private onMainWindowClose = (): void => {
        this.application.quit();
    }

    /**
     * Event handler for the application "window-all-closed" event.
     */
    private onWindowAllClosed = (): void => {
        this.application.quit();
    }

}
