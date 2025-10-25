import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageWithFade from '../../../../shared/components/ImageWithFade';

jest.mock('../../../../shared/utils/config', () => ({
  getImageUrl: (path: string | null | undefined, size: string) => (path ? `https://img/${size}${path}` : null),
}));

describe('ImageWithFade', () => {
  it('renders placeholder when no path', () => {
    render(<ImageWithFade path={null} alt="No image" />);
    const placeholder = screen.getByLabelText(/no image/i);
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveClass('img-placeholder');
  });

  it('adds is-loaded class after load', () => {
    render(<ImageWithFade path="/x.jpg" alt="Poster" size="w200" />);
    const img = screen.getByRole('img', { name: /poster/i }) as HTMLImageElement;
    // Simulate load event
    fireEvent.load(img);
    expect(img).toHaveClass('is-loaded');
    expect(img.src).toContain('https://img/w200/x.jpg');
  });
});
