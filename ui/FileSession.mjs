import { useEffect, useState } from 'preact/hooks';

import { Editor } from './Editor.mjs';
import { KeyboardShortcut } from './KeyboardShortcut.mjs';

import { html } from 'htm/preact';

export const FileSession = ({ onDirtyChange, onSave, text: initialText }) => {
  const [lineCount, setLineCount] = useState(initialText.split('\n').length);
  const [text, setText] = useState(initialText);
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    setLineCount(text.split('\n').length);
  }, [text]);

  useEffect(() => {
    const willBeDirty = initialText !== text;

    if (isDirty !== willBeDirty) {
      setDirty(willBeDirty);
    }
  }, [initialText, isDirty, text]);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const save = () => {
    if (text !== initialText) {
      onSave(text);
    }
  };

  return html`
    <${KeyboardShortcut} matchKey="s" onTrigger=${save}/>
    <${Editor} currentLine=1 lineCount=${lineCount} onTextChange=${setText} text=${text}/>
  `;
};

export default FileSession;
