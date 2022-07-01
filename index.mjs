import { html } from 'htm/preact';
import { render } from 'preact';
import { stylish } from 'stylish-preact';
import { useState } from 'preact/hooks';

const Layout = stylish('div', `
  align-items: stretch;
  border-color: rgba(120, 118, 123, 1);
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  bottom: 0;
  box-sizing: border-box;
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

const TitleBar = stylish('div', `
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: rgba(55, 52, 58, 1);
  color: rgba(180, 176, 182, 1);
  font-weight: 700;
  line-height: 27px;
  text-align: center;
`);

const TitleBarContent = stylish('div', `
  align-items: center;
  display: flex;
  flex-direction: row;
`);

const TitleBarContentCell = stylish('span', `
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 2px;
`);


const TabBar = stylish('div', `
  background-color: rgba(35, 37, 42, 1);
  color: rgba(111, 113, 124, 1);
  display: flex;
  flex-direction: row;
`);

const Tab = stylish('div', [
  `
    align-items: center;
    border-right-color: rgba(26, 26, 31, 1);
    border-top-color: rgba(26, 26, 31, 1);
    border-style: solid;
    border-width: 1px 1px 1px 2px;
    box-sizing: border-box;
    cursor: default;
    display: flex;
    flex-direction: column;
    line-height: 27px;
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    width: 261px;
  `,
  ({ current }) => current ? `
    border-bottom-color: rgba(42, 44, 51, 1);
    border-left-color: rgba(118, 137, 234, 1);
    background-color: rgba(42, 44, 51, 1);
    color: rgba(218, 218, 223, 1);
  ` : `
    border-bottom-color: rgba(26, 26, 31, 1);
    border-left-color: rgba(118, 137, 234, 0);
  `
]);

const TabGutter = stylish('div', `
  border-color: rgba(26, 26, 31, 1);
  border-style: solid;
  border-width: 1px 0;
  flex: 1;
`);

const Main = stylish('div', `
  flex: 1;
  overflow: auto;
`);

const StatusBar = stylish('div', `
  align-items: stretch;
  background-color: rgba(35, 37, 42, 1);
  border-color: rgba(25, 26, 31, 1);
  border-style: solid;
  border-width: 1px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  line-height: 29px;
`);

const StatusBarCell = stylish('span', [
  `
    cursor: default;
    padding: 0 8px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  `,
  {
    rule: `
      background-color: rgba(49, 51, 60, 1);
    `,
    states: [':hover']
  }
]);

const DiffAdditions = stylish('span', `
  color: rgba(153, 196, 150, 1);
`);

const Flex = stylish('span', `
  display: flex;
  flex: 1;
`);

const Editor = stylish('div', `
  font: 400 14px Menlo, Consolas, DejaVu Sans Mono, monospace;
`);

const Line = stylish('div', `
  display: flex;
  flex-direction: row;
  align-items: stretch;
  line-height: 21px;
`);

const LineNumber = stylish('div', `
  color: rgba(80, 82, 98, 1);
  padding: 0 8px;
  text-align: right;
  width: 3em;
`);

const LineText = stylish('pre', [
  `
    font: inherit;
    flex: 1;
    margin: 0;
    padding: 0;
  `,
  ({ current }) => current ? `
    background-color: rgba(47, 49, 59, 1);
  ` : `
    background-color: transparent;
  `
]);

const Icon = stylish('img', `
  height: 1.25em;
  object-fit: contain;
  width: 1.25em;
`);

const state = {
  env: {
    HOME: '/home/adam'
  },
  tabs: [
    {
      cursor: {
        column: 14,
        line: 1
      },
      diff: {
        linesAdded: 2,
        linesChanged: 0,
        linesRemoved: 0
      },
      directory: '/home/adam/Projects/adam-editor',
      encoding: 'UTF-8',
      grammar: 'JavaScript',
      lineTerminator: 'Unix (LF)',
      lines: `console.log('Hello, world!');
`.split('\n'),
      name: 'index.mjs',
      type: 'file'
    },
    {
      name: 'Settings',
      icon: 'settings',
      type: 'app'
    },
    {
      cursor: {
        column: 8,
        line: 9
      },
      diff: {
        linesAdded: 12,
        linesChanged: 0,
        linesRemoved: 0
      },
      directory: '/home/adam/Projects/adam-editor',
      encoding: 'UTF-8',
      grammar: 'HTML',
      lineTerminator: 'Unix (LF)',
      lines: `<!DOCTYPE html>
<html lang="en_US">
  <head>
    <meta charset="UTF-8"/>
    <title>Example</title>
  </head>
  <body>
    <h1>Example</h1>
    <p>Hello, world!</p>
  </body>
</html>
`.split('\n'),
      name: 'index.html',
      type: 'file'
    }
  ]
};

const Application = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const currentTab = state.tabs[currentTabIndex];

  return html`
    <${Layout}>
      <${TitleBar}>
        <${TitleBarContent}>
          ${currentTab.type === 'file' ? html`
            <${TitleBarContentCell}>
              <${Icon} src="/icons/file.png"/>
            <//>
            <${TitleBarContentCell}>${currentTab.name}<//>
            <${TitleBarContentCell}>-<//>
            <${TitleBarContentCell}>${currentTab.directory.replace(state.env.HOME, '~')}<//>
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
          <${Tab} current=${index === currentTabIndex} title=${tab.type === 'file' ? `${tab.directory}/${tab.name}` : ''} onClick=${() => setCurrentTabIndex(index)}>
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
          <${Editor}>
            ${currentTab.lines.map((line, index) => html`
              <${Line}>
                <${LineNumber}>${index + 1}<//>
                <${LineText} current=${(index + 1) === currentTab.cursor.line}>${line}<//>
              <//>
            `)}
          <//>
        ` : html`
          Placeholder for an object of type: ${currentTab.type}
        `}
      <//>
      <${StatusBar}>
        ${currentTab.type === 'file' ? html`
          <${StatusBarCell} title="File Name">${currentTab.name}<//>
          <${StatusBarCell} title="Cursor Position (Line:Column)">${currentTab.cursor.line}:${currentTab.cursor.column}<//>
          <${Flex}/>
          <${StatusBarCell} title="Line Endings">${currentTab.lineTerminator}<//>
          <${StatusBarCell} title="Encoding">${currentTab.encoding}<//>
          <${StatusBarCell} title="Language">${currentTab.grammar}<//>
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
