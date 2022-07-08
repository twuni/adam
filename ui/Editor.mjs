import { html } from 'htm/preact';
import { stylish } from 'stylish-preact';
import { createRef } from 'preact';

const Layout = stylish('div', `
  align-items: stretch;
  background-color: #282c34;
  color: #aeb2be;
  display: flex;
  flex: 1;
  flex-direction: row;
  font: 400 14px Menlo, Consolas, DejaVu Sans Mono, monospace;
  line-height: 21px;
  overflow: hidden;
`);

const Gutter = stylish('pre', `
  box-sizing: border-box;
  color: rgba(80, 82, 98, 1);
  font: inherit;
  line-height: inherit;
  margin: 0 16px 0 0;
  overflow: hidden;
  padding: 0 8px;
  text-align: right;
  width: 3em;
`);

const Edit = stylish('textarea', [
  `
    background: none;
    border-width: 0;
    color: inherit;
    flex: 1;
    font: inherit;
    line-height: inherit;
    margin: 0;
    outline: none;
    overflow: auto;
    padding: 0;
    resize: none;
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
      cursor: pointer;
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

const lines = (n) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    s = `${s}${i + 1}\n`;
  }
  return s;
};

export const Editor = ({ currentLine, lineCount, onTextChange, text }) => {
  const gutter = createRef();

  const syncGutter = (event) => {
    gutter.current.base.scrollTop = event.target.scrollTop;
  };

  return html`
    <${Layout}>
      <${Gutter} ref=${gutter}>${lines(lineCount)}<//>
      <${Edit}
        autocomplete="off"
        autocorrect="off"
        autoFocus
        onFocus=${(event) => {
          event.target.scrollTo(0, 0);
          event.target.setSelectionRange(0, 0);
        }}
        onInput=${(event) => {
          if (typeof onTextChange === 'function') {
            onTextChange(event.target.value);
          }
        }}
        onScroll=${syncGutter}
        spellcheck=${false}
        value=${text}
      />
    <//>
  `;
};

export default Editor;
