import { stylish } from 'stylish-preact';

export const Icon = stylish('img', `
  height: 1.25em;
  object-fit: contain;
  width: 1.25em;
`);

export const VectorIcon = stylish('svg', ({ filled, stroked }) => `
  fill: ${filled ? 'currentColor' : 'none'};
  height: 1em;
  object-fit: contain;
  stroke: ${stroked ? 'currentColor' : 'none'};
  width: 1em;
`);

export default Icon;
