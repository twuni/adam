import { stylish } from 'stylish-preact';

export const TabBar = stylish('ol', `
  background-color: rgba(35, 37, 42, 1);
  color: rgba(111, 113, 124, 1);
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
`);

export default TabBar;
