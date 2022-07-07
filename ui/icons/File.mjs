import { VectorIcon } from '../Icon.mjs';

import { html } from 'htm/preact';

export const File = (props) => html`
  <${VectorIcon} ...${props} stroked viewPort="0 0 16 16">
    <path d="M 2,2 L 3,1 10,1 13,4 13,13 12,14 3,14 2,13 Z M 4,4 L 7,4 M 4,7 L 10,7 M 4,9 L 10,9 M 4,11 L 10,11"/>
  <//>
`;

export default File;
