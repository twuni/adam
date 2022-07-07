import { stylish } from 'stylish-preact';

export const StatusBar = stylish('div', `
  align-items: stretch;
  background-color: #21252b;
  border-color: rgba(25, 26, 31, 1);
  border-style: solid;
  border-width: 1px 0 0;
  box-sizing: border-box;
  color: #aeb2be;
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

export default StatusBar;
