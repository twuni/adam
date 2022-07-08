/* global privileged */

import { StatusBar, StatusBarCell } from './StatusBar.mjs';
import { FileEntry, FileTree, FolderEntry } from './FileTree.mjs';
import { useContext, useEffect, useState } from 'preact/hooks';

import { Browse } from './Browse.mjs';
import { Empty } from './Empty.mjs';
import { FileSession } from './FileSession.mjs';
import { Folder } from './icons/Folder.mjs';
import { Flex } from './Flex.mjs';
import { Grammar } from '../context/Grammar.mjs';
import { KeyboardShortcut } from './KeyboardShortcut.mjs';
import { Tab } from './Tab.mjs';
import { TabBar } from './TabBar.mjs';
import { TabGutter } from './TabGutter.mjs';

import { html } from 'htm/preact';
import { render } from 'preact';
import { stylish } from 'stylish-preact';

const mockPrivileged = () => ({
  env: () => Promise.resolve({}),
  fileTree: (path) => Promise.resolve({ children: [], path }),
  openFile: (path) => Promise.resolve(''),
  quit: () => window.close(),
  saveFile: (file) => Promise.resolve(file)
});

export const Root = stylish('div', `
  align-items: stretch;
  background-color: #21252b;
  bottom: 0;
  color: #393f46;
  display: flex;
  flex-direction: column;
  font: 400 12px Helvetica, Arial, sans-serif;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`);

export const Drawer = stylish('aside', ({ open }) => `
  align-items: stretch;
  border-color: rgba(25, 26, 31, 1);
  border-style: solid;
  border-width: 0 1px 0 0;
  box-sizing: border-box;
  color: #aeb2be;
  display: flex;
  flex-direction: column;
  margin-right: ${open ? '0' : '-300px'};
  opacity: ${open ? '1' : '0'};
  overflow: hidden;
  transition-duration: 100ms;
  transition-property: margin-right, opacity;
  transition-timing-function: ease-in-out;
  width: 300px;
`);

export const DrawerTitle = stylish('header', `
  color: #ffffff;
  line-height: 30px;
  text-align: center;
`);

export const DrawerLayout = stylish('div', `
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
`);

export const Layout = stylish('div', `
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`);

export const Main = stylish('div', `
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`);

const toWindowTitle = (path) => [
  path && path.replace(/^(.*)\/([^\/]+)$/g, '$2'),
  path && path.replace(/^(.*)\/([^\/]+)$/g, '$1'),
  'Adam'
].filter(Boolean).join(' ⁠— ');

export const Application = () => {
  const grammars = useContext(Grammar);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [dirtiness, setDirtiness] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [grammarLabel, setGrammarLabel] = useState();
  const [project, setProject] = useState();
  const [electron, setElectron] = useState();

  useEffect(() => {
    if (!electron) {
      setElectron(typeof privileged === 'undefined' ? mockPrivileged() : privileged);
    }
  }, []);

  useEffect(() => {
    const selectedFile = files[selectedIndex];
    if (selectedFile) {
      const parentPath = selectedFile.path.replace(/^(.*)\/([^\/]+)$/g, '$1');
      if (parentPath) {
        if (!project || !parentPath.startsWith(project.path)) {
          electron.fileTree(parentPath).then((project) => setProject(project));
        }
      }
    }
  }, [files, selectedIndex]);

  useEffect(() => {
    const selectedFile = files[selectedIndex];
    if (selectedFile) {
      const extension = selectedFile.path.replace(/^.+\.([^.]+)$/g, '$1');
      const matchGrammar = grammars.find((grammar) => grammar.matchExtensions.includes(extension)) || {};

      if (grammarLabel !== matchGrammar.label) {
        setGrammarLabel(matchGrammar.label);
      }
    }
  }, [grammars, files, selectedIndex]);

  useEffect(() => {
    if (files.length > 0 && selectedIndex >= files.length) {
      setSelectedIndex(files.length - 1);
    }
  }, [files, selectedIndex]);

  useEffect(() => {
    document.title = toWindowTitle(files[selectedIndex]?.path);
  }, [files, selectedIndex]);

  const closeFile = (index) => {
    if (files.length < 1) {
      electron.quit();
    } else {
      const effectiveIndex = typeof index === 'number' ? index : selectedIndex;
      const nextFiles = [...files];
      nextFiles.splice(effectiveIndex, 1);
      setFiles(nextFiles);
    }
  };

  const dirtyFile = (isDirty) => {
    if (dirtiness[selectedIndex] !== isDirty) {
      const nextDirtiness = [...dirtiness];
      nextDirtiness[selectedIndex] = isDirty;
      setDirtiness(nextDirtiness);
    }
  };

  const saveFile = async (text) => {
    const file = files[selectedIndex];

    if (file) {
      await electron.saveFile({ data: text, path: file.path });

      const nextFiles = [...files];
      nextFiles[selectedIndex] = { data: text, path: file.path };
      setFiles(nextFiles);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const onFileOpen = async (file) => {
    const nextSelectedIndex = files.findIndex((it) => it.path === file.path);

    if (nextSelectedIndex < 0) {
      const appendIndex = files.length;
      setFiles([...files, file]);
      setSelectedIndex(appendIndex);
    } else if (nextSelectedIndex !== selectedIndex) {
      setSelectedIndex(nextSelectedIndex);
    }
  };

  const openPrivilegedFile = async (path) => onFileOpen({ data: await electron.openFile(path), path });

  const selectedFile = files[selectedIndex];

  return html`
    <${Root}>
      <${DrawerLayout}>
        <${Drawer} open=${project && isDrawerOpen}>
          <${DrawerTitle}>Project<//>
          ${project && html`<${FileTree} currentFile=${selectedFile} onFileOpen=${openPrivilegedFile} openFiles=${files} root=${project}/>`}
          <${Browse}
            accept=${grammars.reduce((extensions, grammar) => [
              ...extensions,
              grammar.matchExtensions.map((extension) => `.${extension}`)
            ], []).join(', ') || '*'}
            onOpen=${onFileOpen}
          />
          <${KeyboardShortcut} command matchKey="w" onTrigger=${closeFile}/>
          <${KeyboardShortcut} control matchKey="w" onTrigger=${closeFile}/>
          <${KeyboardShortcut} command matchKey="\\" onTrigger=${toggleDrawer}/>
          <${KeyboardShortcut} control matchKey="\\" onTrigger=${toggleDrawer}/>
        <//>
        <${Layout}>
          ${files.length > 0 ? html`
            <${TabBar}>
              ${files.map((file, index) => html`
                <${Tab}
                  current=${index === selectedIndex}
                  dirty=${dirtiness[index]}
                  hint=${file.path}
                  label=${file.path.replace(/^(.*)\/([^\/]+)$/g, '$2')}
                  onClick=${() => setSelectedIndex(index)}
                  onClose=${() => closeFile(index)}
                />
              `)}
              <${TabGutter}/>
            <//>
            ${selectedFile && html`
              <${Main}>
                <${FileSession} key=${selectedFile.path} onDirtyChange=${dirtyFile} onSave=${saveFile} text=${selectedFile.data}/>
              <//>
            `}
          ` : html`<${Empty}/>`}
        <//>
      <//>
      <${StatusBar}>
        ${selectedFile && html`
          <${StatusBarCell} title="File Name">${selectedFile.path.replace(/^(.*)\/([^\/]+)$/g, '$2')}<//>
          <${Flex}/>
          <${StatusBarCell} title="Line Endings">Unix (LF)<//>
          <${StatusBarCell} title="Encoding">UTF-8<//>
          ${grammarLabel && html`<${StatusBarCell} title="Syntax">${grammarLabel}<//>`}
        `}
      <//>
    <//>
  `;
};

export default Application;
