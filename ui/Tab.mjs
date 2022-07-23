import { X } from './icons/X.mjs';
import { html } from 'htm/preact';
import { stylish } from 'stylish-preact';

const Layout = stylish('li', [
  `
    align-items: center;
    border-right-color: rgba(26, 26, 31, 1);
    border-top-color: rgba(26, 26, 31, 1);
    border-style: solid;
    border-width: 1px 1px 1px 0;
    box-sizing: border-box;
    cursor: default;
    display: flex;
    flex-direction: row;
    line-height: 27px;
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0 0 0 2px;
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    width: 261px;
  `,
  ({ current }) => current ? `
    border-bottom-color: rgba(42, 44, 51, 1);
    background-color: #282c34;
    color: rgba(218, 218, 223, 1);
    padding: 0;
  ` : `
    border-bottom-color: rgba(26, 26, 31, 1);
  `,
  {
    rule: 'transform: scale(0, 0);',
    states: [' > button']
  },
  {
    rule: 'transform: scale(1, 1);',
    states: [':hover > button']
  },
  {
    rule: 'transform: scale(0, 0);',
    states: [':hover > label + span']
  }
]);

const Indicator = stylish('span', `
  background-color: #568af2;
  height: 27px;
  width: 2px;
`);

const Label = stylish('label', `
  flex: 1;
  overflow: hidden;
  padding: 0 8px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`);

const Dot = stylish('span', `
  background-color: #568af2;
  border-radius: 50%;
  height: 8px;
  margin: 0 -14px 0 0;
  transform: scale(1, 1);
  transition-duration: 100ms;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  width: 8px;
`);

const CloseButton = stylish('button', [
  ({ dirty }) => `
    align-items: center;
    background: none;
    background-color: transparent;
    color: ${dirty ? '#568af2' : 'inherit'};
    border: none;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 700;
    height: 18px;
    justify-content: center;
    line-height: 18px;
    margin: 0 8px 0 0;
    padding: 0;
    transform: scale(1, 1);
    transition-duration: 100ms;
    transition-property: background-color, color, transform;
    transition-timing-function: ease-in-out;
    width: 18px;
  `,
  {
    rule: `
      background-color: #568af2;
      color: #000;
    `,
    states: [':hover']
  },
  {
    rule: `
      background-color: #3f5b93;
    `,
    states: [':active:hover']
  }
]);

export const Tab = ({ current, dirty, hint, icon, label, onClick, onClose }) => html`
  <${Layout} current=${current} onClick=${onClick}>
    ${current && html`<${Indicator}/>`}
    ${icon}
    <${Label} title=${hint}>${label}<//>
    ${dirty && html`<${Dot}/>`}
    <${CloseButton} dirty=${dirty} onClick=${onClose}>
      <${X}/>
    <//>
  <//>
`;

export default Tab;
