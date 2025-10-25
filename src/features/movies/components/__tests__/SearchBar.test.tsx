import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';

test('SearchBar updates value on typing', async () => {
  const user = userEvent.setup();
  render(<SearchBar />, { wrapper: withAllProviders() as any });
  const input = screen.getByRole('textbox', { name: /search movies/i });
  await user.clear(input);
  await user.type(input, 'batman');
  expect(input).toHaveValue('batman');
});
