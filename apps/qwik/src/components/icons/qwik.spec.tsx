import { QwikLogo } from './qwik';
import { expect, test } from 'vitest';
import { createDOM } from '@builder.io/qwik/testing';

test('renders QwikLogo component', async () => {
  const { screen, render } = await createDOM();
  await render(
    <QwikLogo />
  );
  expect(screen.innerHTML).toBeTruthy()
});
