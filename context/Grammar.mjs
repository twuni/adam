import { createContext } from 'preact';

export const HTML = Object.freeze({
  icon: 'file',
  label: 'HTML',
  matchExtensions: ['htm', 'html']
});

export const JavaScript = Object.freeze({
  icon: 'file',
  label: 'JavaScript',
  matchExtensions: ['js', 'mjs']
});

export const JSON = Object.freeze({
  icon: 'file',
  label: 'JSON',
  matchExtensions: ['json']
});

export const YAML = Object.freeze({
  icon: 'file',
  label: 'YAML',
  matchExtensions: ['yml', 'yaml']
});

export const Markdown = Object.freeze({
  icon: 'file',
  label: 'Markdown',
  matchExtensions: ['md', 'markdown']
});

export const PlainText = Object.freeze({
  icon: 'file',
  label: 'Plain Text',
  matchExtensions: ['txt']
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
