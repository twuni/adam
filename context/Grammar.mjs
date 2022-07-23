import { createContext } from 'preact';

export const HTML = Object.freeze({
  icon: 'file',
  label: 'HTML',
  matchExtensions: ['htm', 'html'],
  prism: 'html'
});

export const JavaScript = Object.freeze({
  icon: 'file',
  label: 'JavaScript',
  matchExtensions: ['js', 'mjs'],
  prism: 'javascript'
});

export const JSON = Object.freeze({
  icon: 'file',
  label: 'JSON',
  matchExtensions: ['json'],
  prism: 'json'
});

export const YAML = Object.freeze({
  icon: 'file',
  label: 'YAML',
  matchExtensions: ['yml', 'yaml'],
  prism: 'yaml'
});

export const Markdown = Object.freeze({
  icon: 'file',
  label: 'Markdown',
  matchExtensions: ['md', 'markdown'],
  prism: 'markdown'
});

export const PlainText = Object.freeze({
  icon: 'file',
  label: 'Plain Text',
  matchExtensions: ['txt'],
  prism: 'plaintext'
});

export const ALL = Object.freeze([
  HTML,
  JavaScript,
  JSON,
  YAML,
  Markdown,
  PlainText
]);

export const Grammar = createContext(ALL);

export default Grammar;
