import { useContext, useEffect, useState } from 'preact/hooks';

import { Highlighter } from '../context/Highlighter.mjs';

import { createRef } from 'preact';
import { html } from 'htm/preact';
import { stylish } from 'stylish-preact';

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
    caret-color: #568af2;
    color: transparent;
    font: inherit;
    line-height: inherit;
    margin: 0;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: absolute;
    resize: none;
  `,
  ({ height, width }) => [
    height && `height: ${height}px;`,
    width && `width: ${width}px;`
  ].join('\n')
]);

const Highlighting = stylish('pre', `
  font: inherit;
  line-height: inherit;
  margin: 0;
  overflow: hidden;
  padding: 0;
  pointer-events: none;
  position: relative;
  z-index: 1;
`);

const Layers = stylish('section', [
  `
    flex: 1;
    overflow: auto;
    position: relative;
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

const lines = (n) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    s = `${s}${i + 1}\n`;
  }
  return s;
};

export const Editor = ({ currentLine, grammar, lineCount, onTextChange, readonly, text }) => {
  const highlight = useContext(Highlighter);
  const gutter = createRef();
  const highlighting = createRef();
  const editor = createRef();
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    if (highlighting?.current?.base?.firstChild) {
      const syntax = highlighting.current.base;
      syntax.firstChild.innerHTML = highlight(text, grammar);
    }
  }, [grammar, text]);

  useEffect(() => {
    const syncDimensions = setInterval(() => {
      const source = highlighting.current?.base;
      const target = editor.current?.base;

      if (source && target && (target.clientHeight !== source.clientHeight || target.clientWidth !== source.clientWidth)) {
        setDimensions({
          height: source.clientHeight,
          width: source.clientWidth
        });
      }
    }, 50);

    return () => {
      clearInterval(syncDimensions);
    };
  }, [editor, highlighting]);

  const syncGutter = (event) => {
    gutter.current.base.scrollTop = event.target.scrollTop;
  };

  return html`
    <${Layout}>
      <${Gutter} ref=${gutter}>${lines(lineCount)}<//>
      <${Layers} onScroll=${syncGutter}>
        <${Edit}
          autocomplete="off"
          autocorrect="off"
          autoFocus
          height=${dimensions.height}
          onFocus=${(event) => {
            event.target.scrollTo(0, 0);
            event.target.setSelectionRange(0, 0);
          }}
          onInput=${(event) => {
            if (typeof onTextChange === 'function') {
              onTextChange(event.target.value);
            }
          }}
          ref=${editor}
          spellcheck=${false}
          value=${text}
          width=${dimensions.width}
        />
        <${Highlighting} ref=${highlighting}>
          <code/>
        <//>
      <//>
    <//>
  `;
};

export default Editor;
