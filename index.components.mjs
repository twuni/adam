import { stylish } from 'stylish-preact';

export const Layout = stylish('div', `
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

export const TitleBar = stylish('div', `
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: rgba(55, 52, 58, 1);
  color: rgba(180, 176, 182, 1);
  font-weight: 700;
  line-height: 27px;
  text-align: center;
`);

export const TitleBarContent = stylish('div', `
  align-items: center;
  display: flex;
  flex-direction: row;
`);

export const TitleBarContentCell = stylish('span', `
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 2px;
`);

export const TabBar = stylish('div', `
  background-color: rgba(35, 37, 42, 1);
  color: rgba(111, 113, 124, 1);
  display: flex;
  flex-direction: row;
`);

export const Tab = stylish('div', [
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

export const TabGutter = stylish('div', `
  border-color: rgba(26, 26, 31, 1);
  border-style: solid;
  border-width: 1px 0;
  flex: 1;
`);

export const Main = stylish('div', `
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`);

export const StatusBar = stylish('div', `
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

export const StatusBarCell = stylish('span', [
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

export const DiffAdditions = stylish('span', `
  color: rgba(153, 196, 150, 1);
`);

export const Flex = stylish('span', `
  display: flex;
  flex: 1;
`);

export const Editor = stylish('div', `
  font: 400 14px Menlo, Consolas, DejaVu Sans Mono, monospace;
`);

export const Line = stylish('div', `
  display: flex;
  flex-direction: row;
  align-items: stretch;
  line-height: 21px;
`);

export const LineNumber = stylish('div', `
  color: rgba(80, 82, 98, 1);
  padding: 0 8px;
  text-align: right;
  width: 3em;
`);

export const LineText = stylish('pre', [
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

export const Icon = stylish('img', `
  height: 1.25em;
  object-fit: contain;
  width: 1.25em;
`);
