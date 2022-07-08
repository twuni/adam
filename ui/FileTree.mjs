import { Caret } from './icons/Caret.mjs';
import { File } from './icons/File.mjs';
import { Folder } from './icons/Folder.mjs';

import { html } from 'htm/preact';
import { stylish } from 'stylish-preact';
import { useState } from 'preact/hooks';

const Root = stylish('div');

const Header = stylish('header', [
  ({ current, open }) => `
    align-items: center;
    background-color: ${current ? '#3a3f4b' : 'transparent'};
    color: ${current ? '#ffffff' : open ? '#ffffff' : 'inherit'};
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: ${current ? '400' : open ? '700' : '400'};
    height: 29px;
    line-height: 29px;
    transition-duration: 100ms;
    transition-property: background-color, color, font-weight;
    transition-timing-function: ease-in-out;
    user-select: none;
  `,
  {
    rule: ({ open }) => `
      background-color: ${open ? '#434853' : '#3a3f4b'};
      color: #ffffff;
    `,
    states: [':hover']
  },
  {
    rule: ({ open }) => `
      background-color: ${open ? '#4a4f5a' : '#434853'};
      color: #ffffff;
    `,
    states: [':active', ':active:hover']
  }
]);

const Cell = stylish('div', ({ rotated }) => `
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 4px;
  transform: rotate(${rotated ? '90' : '0'}deg);
  transition-duration: 100ms;
  transition-property: transform;
  transition-timing-function: ease-in-out;
`);

const Indent = stylish('div', `
  margin-left: 16px;
`);

const Label = stylish('label', `
  cursor: inherit;
  flex: 1;
  height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`);

export const FolderEntry = ({ children, isOpenByDefault = false, path }) => {
  const [isOpen, setOpen] = useState(isOpenByDefault);

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return html`
    <${Root}>
      <${Header} onClick=${toggleOpen}>
        <${Cell} rotated=${isOpen}>
          <${Caret}/>
        <//>
        <${Cell}>
          <${Folder}/>
        <//>
        <${Label}>${path.replace(/^.*\/([^\/]+)$/g, '$1')}<//>
      <//>
      ${isOpen && html`<${Indent}>${children}<//>`}
    <//>
  `;
};

export const FileEntry = ({ icon, isCurrent, isOpen, onClick, path }) => html`
  <${Root}>
    <${Header} current=${isCurrent} onClick=${onClick} open=${isOpen}>
      <${Cell} style="visibility:hidden">
        <${Caret}/>
      <//>
      <${Cell}>
        ${icon || html`<${File}/>`}
      <//>
      <${Label}>${path.replace(/^.*\/([^\/]+)$/g, '$1')}<//>
    <//>
  <//>
`;

const Layout = stylish('div', [
  `
    flex: 1;
    overflow: auto;
    scrollbar-color: #4b5362;
    scrollbar-width: thin;
  `,
  {
    rule: `
      background-color: transparent;
      width: 8px;
    `,
    states: ['::-webkit-scrollbar']
  },
  {
    rule: `
      background-color: #4b5362;
      border-radius: 4px;
    `,
    states: ['::-webkit-scrollbar-thumb']
  },
  {
    rule: `
      background-color: transparent;
    `,
    states: ['::-webkit-scrollbar-corner']
  }
]);

export const FileTreeEntry = ({ currentFile, isOpenByDefault = false, onFileOpen, openFiles = [], root }) => {
  if (root.children) {
    return html`
      <${FolderEntry} isOpenByDefault=${isOpenByDefault} path=${root.path}>
        ${root.children.map((it) => html`<${FileTreeEntry} currentFile=${currentFile} onFileOpen=${onFileOpen} openFiles=${openFiles} root=${it}/>`)}
      <//>
    `;
  }

  return html`<${FileEntry} isCurrent=${currentFile && currentFile.path === root.path} isOpen=${openFiles.some((it) => it.path === root.path)} path=${root.path} onClick=${() => onFileOpen(root.path)}/>`;
};

export const FileTree = ({ currentFile, onFileOpen, openFiles = [], root }) => html`
  <${Layout}>
    <${FileTreeEntry} currentFile=${currentFile} isOpenByDefault onFileOpen=${onFileOpen} openFiles=${openFiles} root=${root}/>
  <//>
`;

export default FileTree;
