import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../client/pages/Dashboard';
import {
  describe,
  it,
  expect,
  xdescribe,
  beforeEach,
  beforeAll,
  test,
} from '@jest/globals';

describe('Dashboard Page', () => {
  let dashboardComp;
  const props = {};

  beforeEach(async () => {
    const loginComp = await render(
      <BrowserRouter>
        <Dashboard {...props} />
      </BrowserRouter>
    );
  });
  test('if no DB has been connected, button prompts connecting one', async () => {
    expect(screen.getByText('Please connect a database')).toBeInTheDocument();
  });
});
