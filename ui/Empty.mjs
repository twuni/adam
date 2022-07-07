import { stylish } from 'stylish-preact';
import { html } from 'htm/preact';

const OuterLayout = stylish('div', `
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  font-size: 24px;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
`);

const InnerLayout = stylish('div', `
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
`);

const Line = stylish('p', `
  align-items: center;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
`);

const Keyboard = stylish('span', `
  align-items: center;
  border-radius: 8px;
  border-color: #393f46;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  font-weight: 400;
  margin: 0 8px;
  padding: 0 8px;
`);

export const Empty = () => html`
  <${OuterLayout}>
    <${InnerLayout}>
      <${Line}>
        You can open a file with <${Keyboard}>Ctrl<//> + <${Keyboard}>O<//>
      <//>
    <//>
  <//>
`;

export default Empty;
