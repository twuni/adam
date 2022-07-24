/* global privileged */

import { createContext } from 'preact';

const mockPrivileged = () => ({
  env: () => Promise.resolve({}),
  fileTree: (path) => Promise.resolve({ children: [], path }),
  openFile: (path) => Promise.resolve(''),
  quit: () => window.close(),
  saveFile: (file) => Promise.resolve(file)
});

export const Privileged = createContext(typeof privileged === 'undefined' ? mockPrivileged() : privileged);

export default Privileged;