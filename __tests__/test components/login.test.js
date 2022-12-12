import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Login from '../../client/pages/Login';
import { describe, it, expect, xdescribe, beforeEach, beforeAll, test} from'@jest/globals';

describe('Login Page', () => {

  let loginComp;
  const props = {}

  beforeEach(async () => {
    const loginComp = await render(
      <BrowserRouter>
        <Login {...props}/>
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
  //makes sure inputs are available
  test('Username input field to be rendered', async() => {
    //only text input is available by textbox role.
    expect(screen.getByRole('textbox', {name: 'Username:'})).toBeInTheDocument()
  })
  test('Login header', async()=>{
    const header = await (screen.getByTestId('login-header'))
    expect(header).toBeInTheDocument()
  })

})