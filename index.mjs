import {
  DiffAdditions,
  Flex,
  Icon,
  Layout,
  Main,
  StatusBar,
  StatusBarCell,
  Tab,
  TabBar,
  TabGutter,
  TitleBar,
  TitleBarContent,
  TitleBarContentCell
} from './index.components.mjs';
import { useEffect, useReducer, useState } from 'preact/hooks';

import { Editor } from './Editor.mjs';
import { html } from 'htm/preact';
import { render } from 'preact';

const env = Object.freeze({
  HOME: '/home/adam'
});

const json = (path) => () => fetch(path).then((response) => response.json());

const api = {
  appSessions: json('/api/app-sessions.json'),
  apps: json('/api/apps.json'),
  fileSessions: json('/api/file-sessions.json'),
  files: json('/api/files.json'),
  grammars: json('/api/grammars.json')
};

const Application = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentTabContent, setCurrentTabContent] = useState();
  const [apps, setApps] = useState();
  const [files, setFiles] = useState();
  const [grammars, setGrammars] = useState();
  const [fileSessions, setFileSessions] = useState();

  useEffect(() => {
    if (!apps) {
      api.apps().then(setApps);
    }
  }, [apps]);

  useEffect(() => {
    if (!files) {
      api.files().then(setFiles);
    }
  }, [files]);

  useEffect(() => {
    if (!grammars) {
      api.grammars().then(setGrammars);
    }
  }, [grammars]);

  useEffect(() => {
    if (!fileSessions) {
      api.fileSessions().then(setFileSessions);
    }
  }, [fileSessions]);

  useEffect(() => {
    if (!(apps && files)) {
      return;
    }

    if (currentTabIndex < apps.length) {
      document.title = apps[currentTabIndex].name;
      return;
    }

    const { path = '/untitled' } = apps[currentTabIndex] || files[currentTabIndex - apps.length];
    const [directory, name] = (/^(.*)\/([^\/]+)$/g).exec(path).slice(1);

    document.title = `${name} - ${directory.replace(env.HOME, '~')}`;
  }, [currentTabIndex, apps, files]);

  useEffect(() => {
    if (apps && files && currentTabIndex >= apps.length) {
      setCurrentTabContent(files[currentTabIndex - apps.length].data);
    }
  }, [apps, files, currentTabIndex]);

  if (!(apps && files && grammars && fileSessions)) {
    return null;
  }

  const state = {
    tabs: [
      ...apps.map((app) => ({ ...app, type: 'app' })),
      ...files.map((file) => ({
        ...file,
        ...fileSessions.find((session) => {
          if (typeof session.filePath !== 'undefined') {
            return session.filePath === file.path;
          }

          if (typeof session.fileId !== 'undefined') {
            return session.fileId === file.id;
          }

          return false;
        }),
        directory: typeof file.path === 'undefined' ? undefined : file.path.replace(/^(.*)\/([^\/]+)$/g, '$1'),
        encoding: 'UTF-8',
        grammar: grammars.reduce((a, grammar) => {
          if (!a.match) {
            if (grammar.matchExtensions.includes(a.extension)) {
              a.match = grammar;
            }
          }
          return a;
        }, {
          extension: (file.path || 'untitled.txt').replace(/^.*\.([^.]+)$/g, '$1')
        }).match,
        lineCount: file.data.split('\n').length + 1,
        lineTerminator: '\n',
        name: (file.path || '/untitled').replace(/^(.*)\/([^\/]+)$/g, '$2'),
        type: 'file'
      }))
    ]
  };

  const currentTab = state.tabs[currentTabIndex];

  return html`
    <link rel="shortcut icon" href=${`/icons/${currentTab.icon || currentTab.grammar.icon}.png`}/>
    <${Layout}>
      <${TitleBar}>
        <${TitleBarContent}>
          ${currentTab.type === 'file' ? html`
            <${TitleBarContentCell}>
              <${Icon} src="/icons/${currentTab.grammar.icon}.png"/>
            <//>
            <${TitleBarContentCell}>${currentTab.name}<//>
            ${currentTab.directory && html`
              <${TitleBarContentCell}>-<//>
              <${TitleBarContentCell}>${currentTab.directory.replace(env.HOME, '~')}<//>
            `}
          ` : html`
            <${TitleBarContentCell}>
              <${Icon} src="/icons/${currentTab.icon}.png"/>
            <//>
            <${TitleBarContentCell}>${currentTab.name}<//>
          `}
        <//>
      <//>
      <${TabBar}>
        ${state.tabs.map((tab, index) => html`
          <${Tab} current=${index === currentTabIndex} title=${tab.type === 'file' ? `${tab.path}` : ''} onClick=${() => setCurrentTabIndex(index)}>
            <${TitleBarContent}>
              ${tab.icon && html`
                <${TitleBarContentCell}>
                  <${Icon} src=${`/icons/${tab.icon}.png`}/>
                <//>
              `}
              <${TitleBarContentCell}>${tab.name}<//>
            <//>
          <//>
        `)}
        <${TabGutter}/>
      <//>
      <${Main}>
        ${currentTab.type === 'file' ? html`
          <${Editor}
            currentLine=${currentTab.cursor.line}
            lineCount=${(currentTabContent === undefined ? currentTab.data : currentTabContent).split(currentTab.lineTerminator).length }
            text=${currentTab.data}
          />
        ` : html`
          Placeholder for an object of type: ${currentTab.type}
        `}
      <//>
      <${StatusBar}>
        ${currentTab.type === 'file' ? html`
          <${StatusBarCell} title="File Name">${currentTab.name}<//>
          <${StatusBarCell} title="Cursor Position (Line:Column)">${currentTab.cursor.line}:${currentTab.cursor.column}<//>
          <${Flex}/>
          <${StatusBarCell} title="Line Endings">${currentTab.lineTerminator === '\n' ? 'Unix (LF)' : 'Windows (CRLF)'}<//>
          <${StatusBarCell} title="Encoding">${currentTab.encoding}<//>
          <${StatusBarCell} title="Language">${currentTab.grammar.name}<//>
          <${StatusBarCell} title="Lines Changed">
            <${DiffAdditions}>+${currentTab.diff.linesAdded}<//>
          <//>
        ` : html`
          <${StatusBarCell}>${currentTab.name}<//>
        `}
      <//>
    <//>
  `;
};

render(html`<${Application}/>`, document.body);
