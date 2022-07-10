import { PerformanceObserver, performance } from 'node:perf_hooks';

import { JSDOM } from 'jsdom';

import assert from 'node:assert/strict';
import { html } from 'htm/preact';
import { render } from 'preact';
import { randomBytes } from 'node:crypto';

const colorize = (code) => (text) => `\x1B[${code}m${text}\x1B[0m`;

const bold = colorize('1');
const red = colorize('31');
const green = colorize('32');
const dim = colorize('2');

const PASS = green('✔');
const FAIL = red('✘');

const timing = {};

const observer = new PerformanceObserver((items) => {
  for (const entry of items.getEntries()) {
    const callback = timing[entry.name];
    if (callback) {
      callback(entry.duration);
      performance.clearMeasures(entry.name);
      performance.clearMarks(`${entry.name}:begin`);
    }
  }
});

observer.observe({ type: 'measure' });

export const describe = async (description, runSuite) => {
  let pending = 0;
  const results = [];

  const flush = () => {
    pending -= 1;

    if (pending <= 0) {
      process.stderr.write(`${results.join('\n')}\n`);
    }
  };

  if (typeof global.document === 'undefined') {
    const { window: { document } } = new JSDOM(`<!DOCTYPE html><html lang="en_US"><head><meta charset="UTF-8"/></head><body></body></html>`);
    Object.assign(global, { document });
  }

  const suiteId = randomBytes(8).toString('hex');

  performance.mark(`${suiteId}:begin`);
  pending += 1;

  await runSuite(async (description, runTest) => {
    const testId = randomBytes(8).toString('hex');

    performance.mark(`${testId}:begin`);
    pending += 1;
    try {
      await runTest((element) => {
        for (let child = document.body.firstChild; child; child = document.body.firstChild) {
          child.parentNode.removeChild(child);
        }

        render(element, document.body);

        return document.body;
      });
      timing[testId] = (duration) => {
        results.push(` ${PASS} ${description} ${dim(`${Math.ceil(duration)} ms`)}`);
        flush();
      };
      performance.measure(testId, `${testId}:begin`);
    } catch (error) {
      timing[testId] = (duration) => {
        results.push(` ${FAIL} ${description} ${dim(`${Math.ceil(duration)} ms`)}\n   ${bold(error.name)} ${error.message.replace(/\n/g, '\n   ')}`);
        flush();
      };
      performance.measure(testId, `${testId}:begin`);
    }
  });

  timing[suiteId] = (duration) => {
    results.unshift(`${bold(description)} ${dim(`${Math.ceil(duration)} ms`)}`);
    flush();
  };

  performance.measure(suiteId, `${suiteId}:begin`);
};

export { assert };
