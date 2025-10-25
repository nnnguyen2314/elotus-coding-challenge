import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SegmentedToggle from '../SegmentedToggle';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';

test('SegmentedToggle toggles between grid and list', async () => {
  const onChange = jest.fn();
  render(<SegmentedToggle value="grid" onChange={onChange} />, { wrapper: withAllProviders() as any });
  const grid = screen.getByRole('tab', { name: /grid/i });
  const list = screen.getByRole('tab', { name: /list/i });
  expect(grid).toHaveAttribute('aria-selected', 'true');
  expect(list).toHaveAttribute('aria-selected', 'false');
  await userEvent.click(list);
  expect(onChange).toHaveBeenCalledWith('list');
});
