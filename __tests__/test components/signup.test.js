import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../../client/pages/Signup';
import {
  describe,
  it,
  expect,
  xdescribe,
  beforeEach,
  test,
} from '@jest/globals';

describe('Signup Page', () => {
  let signupComp;

  beforeEach(async () => {
    const signupComp = await render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  });

  test('Submit button rendered', async () => {
    const buttons = await screen.getAllByRole('button', { name: 'Submit' });
    expect(buttons.length).toBe(1);
  });

  test('Username input rendered', () => {
    expect(
      screen.getByRole('textbox', { name: 'Username:' })
    ).toBeInTheDocument();
  });

  test('Signup header', async () => {
    const header = await screen.getByTestId('signup-header');
    expect(header).toBeInTheDocument();
  });
});
