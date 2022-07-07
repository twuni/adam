import { VectorIcon } from '../Icon.mjs';

import { html } from 'htm/preact';

export const Folder = (props) => html`
  <${VectorIcon} ...${props} filled viewPort="0 0 14 14">
    <path d="M 0,2 L 1,1 5,1 6,2 6,3 12,3 13,4 13,11 12,12 1,12 0,11 Z"/>
  <//>
`;

export default Folder;
