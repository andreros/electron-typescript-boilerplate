import { Window } from '../window';

export class MainMenu {

    public static getMainMenu = (application: Electron.App) => {
        let mainMenu = [];
        // In MacOS add an empty menu to shift the regular menu one position to the right.
        if (process.platform === 'darwin') {
            mainMenu.push({
                label: '',
                submenu: [
                    {
                        label: 'Quit',
                        accelerator: process.platform === 'darwin' ? 'Alt+Q' : 'Ctrl+Q',
                        click() {
                            application.quit();
                        }
                    }
                ]
            });
        }

        // main menu
        mainMenu.push({
            label: 'Actions',
            submenu: [
                {
                    label: 'Open new window',
                    accelerator: process.platform === 'darwin' ? 'Alt+I' : 'Ctrl+I',
                    click() {
                        Window.getWindow({
                            target: 'index.html'
                        });
                    }
                }
            ]
        });

        // developer tools
        if (process.env.NODE_ENV !== 'production') {
            mainMenu.push({
                label: 'Developer Tools',
                submenu: [
                    {
                        role: 'reload' // Reload the application through Cmd+R or Ctrl+R
                    },
                    {
                        label: 'Toggle DevTools',
                        accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Ctrl+I',
                        click(item: any, focusedWindow: any) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                ]
            });
        }

        return mainMenu;
    }

}
