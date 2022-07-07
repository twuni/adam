import { Application } from './ui/Application.mjs';

import { html } from 'htm/preact';
import { render } from 'preact';

render(html`
  <${Application}/>
`, document.body);
