import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Signup from '../../client/pages/Signup';
import { describe, it, expect, xdescribe, beforeEach, test} from'@jest/globals';

// does it have the number of buttons
// does it have onclick function

describe('Signup Page', () => {
  let signupComp;

  beforeEach(async () => {
    const signupComp = await render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  })
  // create a beforeEach here?

test('Submit button rendered', async () => {
  const buttons = await (screen.getAllByRole('button', {name: 'Submit'}));
    expect(buttons.length).toBe(1)
})


test('  Username input rendered', () => {
  expect(screen.getByRole('textbox', {name: 'Username:'})).toBeInTheDocument()

})

})