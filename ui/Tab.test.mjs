import { assert, describe } from '../ui.testing.mjs';

import { Tab } from './Tab.mjs';

import { html } from 'htm/preact';

describe('<Tab>', (it) => {
  it('renders the given label', (mount) => {
    const { textContent } = mount(html`<${Tab} label="Demo"/>`);
    assert.match(textContent, /Demo/g);
  });

  it('renders the given icon', (mount) => {
    const { textContent } = mount(html`<${Tab} icon="Pop"/>`);
    assert.match(textContent, /Pop/g);
  });

  it('renders differently when current', (mount) => {
    const { innerHTML: whenCurrent } = mount(html`<${Tab} current/>`);
    const { innerHTML: whenNotCurrent } = mount(html`<${Tab}/>`);

    assert.notDeepEqual(whenCurrent, whenNotCurrent);
  });

  it('renders differently when dirty', (mount) => {
    const { innerHTML: whenDirty } = mount(html`<${Tab} dirty/>`);
    const { innerHTML: whenNotDirty } = mount(html`<${Tab}/>`);

    assert.notDeepEqual(whenDirty, whenNotDirty);
  });

  it('renders deterministically', (mount) => {
    const { innerHTML: a } = mount(html`<${Tab}/>`);
    const { innerHTML: b } = mount(html`<${Tab}/>`);

    assert.deepEqual(a, b);
  });
});
