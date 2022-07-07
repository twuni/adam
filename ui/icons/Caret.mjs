import { VectorIcon } from '../Icon.mjs';

import { html } from 'htm/preact';

export const Caret = (props) => html`
  <${VectorIcon} ...${props} stroked viewPort="0 0 16 16">
    <path d="M 6,4 L 10,7 10,8 6,12"/>
  <//>
`;

export default Caret;
