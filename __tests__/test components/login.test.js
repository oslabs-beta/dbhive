import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Login from '../../client/pages/Login';
import { describe, it, expect, xdescribe, beforeEach, test} from'@jest/globals';

describe('Login Page', () => {

beforeEach(async () => {
  const loginComp = await render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
});
  test('Submit button rendered', async() =>{
    const buttons = await (screen.getAllByRole('button', {name: 'Submit'}));
    expect(buttons.length).toBe(1)
  })
  //this value is 2 because it inclues the navbar button and the button on the main component
  test('Sign Up button rendered', async() =>{
    const buttons = await (screen.getAllByRole('button', {name: 'Sign Up'}));
    expect(buttons.length).toBe(2)
  })
  test('renders dashboard', async() => {
    const button = screen.getByRole('button', {name: 'Submit'})
    fireEvent.click(button)
  })
  // it('Renders dashboard when submit button is clicked', () => {
  //   const button = (screen.getByRole('button', {name: 'Submit'}));
  //   fireEvent.click(button)
  //   expect(window.location.href).toEqual('/dashboard')
  // })
  //renders error message when submit is clicked without info (prod mode)

})