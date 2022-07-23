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

export const Terraform = Object.freeze({
  icon: 'file',
  label: 'Terraform',
  matchExtensions: ['tf'],
  prism: 'hcl'
});

export const ALL = Object.freeze([
  HTML,
  JavaScript,
  JSON,
  YAML,
  Markdown,
  Terraform,
  PlainText
]);

export const createGrammarMatcher = (cache = {}) => {
  cache.mappings = {};
  const listGrammars = () => {
    if (!cache.grammars) {
      cache.grammars = Object.keys(Prism.languages).reduce((all, name) => {
        if (!all.some((it) => it.prism === name)) {
          all.push(Object.freeze({
            icon: 'file',
            label: `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`,
            matchExtensions: [name],
            prism: name
          }));
        }
        return all;
      }, [...ALL]);
    }

    return cache.grammars;
  };

  return (path) => {
    if (!path) {
      return listGrammars();
    }

    if (!cache.mappings[path]) {
      const extension = path.replace(/^.+\.([^.]+)$/g, '$1');

      cache.mappings[path] = listGrammars().find((grammar) => grammar.matchExtensions.includes(extension)) || PlainText;
    }

    return cache.mappings[path];
  };
};

export const Grammar = createContext(createGrammarMatcher());

export default Grammar;
