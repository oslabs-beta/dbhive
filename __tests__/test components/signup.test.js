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

// if username or password is blank
//TODO: rewrite to check for inputs / labels for username and password
//delete since it is handled by front end/back end logic
test('Missing username or password entry returns an error', () => {
  const button = screen.getByRole('button', {name: 'Submit'});
  fireEvent.click(button)
  expect(screen.getByText(/incorrect username or password/i)).toBeInDocument();

  // expect(errorText.length).toBe(2)
})

})