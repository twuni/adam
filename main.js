const { BrowserWindow, Menu, app, dialog, ipcMain } = require('electron');
const { opendir, readFile, writeFile } = require('node:fs/promises');
const path = require('path');

Menu.setApplicationMenu(Menu.buildFromTemplate([
  {
    label: '&File',
    submenu: [
      {
        accelerator: 'CommandOrControl+W',
        click: () => {
          // FIXME: Ideally we wire this in to the renderer process's logic, but I haven't figured out how to do that, yet.
        },
        label: 'Close'
      },
      {
        accelerator: 'CommandOrControl+Shift+I',
        role: 'toggleDevTools',
        label: 'Developer Tools'
      },
      {
        accelerator: 'CommandOrControl+R',
        role: 'reload',
        label: 'Reload'
      }
    ]
  },
  {
    label: '&Edit',
    submenu: [
      { accelerator: 'CommandOrControl+Z', label: 'Undo', role: 'undo' },
      { accelerator: 'CommandOrControl+Shift+Z', label: 'Redo', role: 'redo' },
      { type: 'separator' },
      { accelerator: 'CommandOrControl+X', label: 'Cut', role: 'cut' },
      { accelerator: 'CommandOrControl+C', label: 'Copy', role: 'copy' },
      { accelerator: 'CommandOrControl+V', label: 'Paste', role: 'paste' }
    ]
  }
]));

app.whenReady().then(() => {
  ipcMain.handle('os:env', () => ({ ...process.env }));

  ipcMain.handle('file:save', (event, file) => writeFile(file.path, file.data));

  ipcMain.handle('file:open', (event, path) => readFile(path, { encoding: 'utf8' }));

  ipcMain.handle('file:tree', async (event, rootPath) => {
    const traverse = async (rootPath) => {
      const parent = { children: [], path: rootPath };
      const base = await opendir(rootPath);

      let entry = await base.read();

      while (entry !== null) {
        if (entry.isDirectory()) {
          parent.children.push(await traverse(path.join(rootPath, entry.name)));
        } else if (entry.isFile()) {
          parent.children.push(Object.freeze({ path: path.join(rootPath, entry.name) }));
        }

        entry = await base.read();
      }

      await base.close();

      parent.children.sort((a, b) => {
        if (a.children && !b.children) {
          return -1;
        }
        if (!a.children && b.children) {
          return 1;
        }
        if (a.path < b.path) {
          return -1;
        }
        if (a.path > b.path) {
          return 1;
        }
        return 0;
      });

      return Object.freeze(parent);
    };

    return traverse(rootPath);
  });

  ipcMain.handle('quit', () => app.quit());

  const window = new BrowserWindow({
    autoHideMenuBar: true,
    height: 1080,
    icon: path.join(__dirname, 'icon.png'),
    title: 'Adam',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    width: 1920
  });

  window.loadFile('index.html');
});
