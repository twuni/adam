import { keyframes, stylish } from 'stylish-preact';

import { Caret } from './icons/Caret.mjs';
import { File } from './icons/File.mjs';
import { Folder } from './icons/Folder.mjs';

import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

const flash = keyframes`
  0% {
    background-color: transparent;
  }

  50% {
    background-color: #568af2;
  }

  100% {
    background-color: transparent;
  }
`;

const Root = stylish('div');

const Header = stylish('header', [
  ({ current, gitStatus, ignored, open }) => `
    align-items: center;
    border-color: ${current ? '#568af2' : 'transparent'};
    border-style: solid;
    border-width: 0 0 0 2px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    transition-duration: 100ms;
    transition-property: background-color, color, font-weight;
    transition-timing-function: ease-in-out;
    user-select: none;
    ${current ? `
      animation-delay: 0;
      animation-direction: normal;
      animation-duration: 500ms;
      animation-fill-mode: both;
      animation-iteration-count: 1;
      animation-name: ${flash};
      animation-timing-function: ease-in-out;
    ` : `
    `}

    ${ignored ? `
      opacity: 0.5;
    ` : `
      opacity: 1;
    `}

    ${gitStatus === 'M' ? `
      color: #e2c08d;
    ` : gitStatus === '?' ? `
      color: #73c990;
    ` : current ? `
      color: #ffffff;
    ` : `
      color: inherit;
    `}
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
  font-size: 13px;
  height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`);

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

export const FolderEntry = ({ children, git, ignoredFiles, isExpandedByDefault = false, openFiles, path }) => {
  const [isExpanded, setExpanded] = useState(isExpandedByDefault);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  return html`
    <${Root}>
      <${Header} gitStatus=${git && (git.find((it) => it.path.startsWith(path)) || {}).status} ignored=${ignoredFiles.some((it) => it.path === path)} open=${openFiles.some((it) => it.path.startsWith(path))} onClick=${toggleExpanded}>
        <${Cell} rotated=${isExpanded}>
          <${Caret}/>
        <//>
        <${Cell}>
          <${Folder}/>
        <//>
        <${Label}>${path.replace(/^.*\/([^\/]+)$/g, '$1')}<//>
      <//>
      ${isExpanded && html`<${Indent}>${children}<//>`}
    <//>
  `;
};

export const FileEntry = ({ gitStatus, icon, isCurrent, isIgnored, isOpen, onClick, path }) => html`
  <${Root}>
    <${Header} current=${isCurrent} gitStatus=${gitStatus} ignored=${isIgnored} onClick=${onClick} open=${isOpen}>
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

export const FileTreeEntry = ({ currentFile, git, ignoredFiles = [], isExpandedByDefault = false, onFileOpen, openFiles = [], root }) => {
  if (root.children) {
    return html`
      <${FolderEntry} git=${root.git || git} ignoredFiles=${root.ignored || ignoredFiles} isExpandedByDefault=${openFiles.some((it) => it.path.startsWith(root.path))} openFiles=${openFiles} path=${root.path}>
        ${root.children.map((it) => html`<${FileTreeEntry} currentFile=${currentFile} git=${root.git || git} ignoredFiles=${root.ignored || ignoredFiles} onFileOpen=${onFileOpen} openFiles=${openFiles} root=${it}/>`)}
      <//>
    `;
  }

  return html`
    <${FileEntry}
      gitStatus=${git && (git.find((it) => it.path === root.path) || {}).status}
      isCurrent=${currentFile && currentFile.path === root.path}
      isIgnored=${ignoredFiles.some((it) => it.path === root.path)}
      isOpen=${openFiles.some((it) => it.path === root.path)}
      path=${root.path}
      onClick=${() => onFileOpen(root.path)}
    />
  `;
};

export const FileTree = ({ currentFile, onFileOpen, openFiles = [], root }) => html`
  <${Layout}>
    <${FileTreeEntry} currentFile=${currentFile} onFileOpen=${onFileOpen} openFiles=${openFiles} root=${root}/>
  <//>
`;

export default FileTree;
