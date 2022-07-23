import { VectorIcon } from '../Icon.mjs';

import { html } from 'htm/preact';

export const X = (props) => html`
  <${VectorIcon} ...${props} stroked viewPort="0 0 14 14">
    <path d="M 4,4 L 10,10 M 10,4 L 4,10" style="stroke-width:2"/>
  <//>
`;

export default X;
