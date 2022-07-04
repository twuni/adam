import { html } from 'htm/preact';
import { stylish } from 'stylish-preact';

const Layout = stylish('div', `
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: row;
  font: 400 14px Menlo, Consolas, DejaVu Sans Mono, monospace;
  line-height: 21px;
`);

const Gutter = stylish('pre', `
  color: rgba(80, 82, 98, 1);
  font: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0 8px;
  text-align: right;
  width: 3em;
`);

const Edit = stylish('textarea', `
  background: none;
  border-width: 0;
  color: inherit;
  flex: 1;
  font: inherit;
  line-height: inherit;
  margin: 0;
  outline: none;
  padding: 0;
`);

const lines = (n) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    s = `${s}${i + 1}\n`;
  }
  return s;
};

export const Editor = ({ currentLine, lineCount, onTextChange, text }) => {
  return html`
    <${Layout}>
      <${Gutter}>${lines(lineCount)}<//>
      <${Edit}
        onInput=${(event) => {
          const { selectionEnd, selectionStart, value: nextValue } = event.target;
          event.target.value = text;
          event.target.setSelectionRange(selectionStart, selectionEnd);
          if (typeof onTextChange === 'function') {
            onTextChange(nextValue);
          }
        }}
        value=${text}
      />
    <//>
  `;
};

export default Editor;
