import { KeyboardShortcut } from './KeyboardShortcut.mjs';
import { createRef } from 'preact';
import { html } from 'htm/preact';
import { stylish } from 'stylish-preact';
import { useState } from 'preact/hooks';

const Input = stylish('input', `
  background: none;
  border: none;
  bottom: 0;
  color: rgba(0, 0, 0, 0);
  height: 1px;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  transform: scale(0, 0);
  width: 1px;
`);

export const Browse = ({ accept = '*', onOpen }) => {
  const input = createRef();
  const [busy, setBusy] = useState();

  const onFilesSelect = async (event) => {
    await Promise.all(Array.from(input.current?.base?.files).map(async (file) => {
      const data = await file.text();
      onOpen({ data, file, path: file.path });
    }));
    setBusy(false);
  };

  const openFile = () => {
    if (!busy) {
      setBusy(true);
      input.current?.base?.showPicker();
    }
  };

  return html`
    <${KeyboardShortcut} matchKey="o" onTrigger=${openFile}/>
    <${Input} accept=${accept} onInput=${onFilesSelect} ref=${input} type="file"/>
  `;
};

export default Browse;
