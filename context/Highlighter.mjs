import { createContext } from 'preact';

export const Highlighter = createContext((text, grammar = { prism: 'plaintext' }) => Prism.highlight(text, Prism.languages[grammar.prism] || Prism.languages.plaintext, grammar.prism || 'plaintext'));

export default Highlighter;
