const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('privileged', {
  env: () => ipcRenderer.invoke('os:env'),
  fileTree: (path) => ipcRenderer.invoke('file:tree', path),
  openFile: (path) => ipcRenderer.invoke('file:open', path),
  quit: () => ipcRenderer.invoke('quit'),
  saveFile: (file) => ipcRenderer.invoke('file:save', file)
});
