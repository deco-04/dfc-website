import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RatingChip, GOOGLE_REVIEWS_URL } from '@/components/rating-chip';

describe('RatingChip', () => {
  it('links to the canonical Google reviews URL in a new tab', () => {
    render(<RatingChip />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', GOOGLE_REVIEWS_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel') ?? '').toContain('noopener');
  });

  it('shows the 5.0 rating and install count', () => {
    render(<RatingChip />);
    expect(screen.getByText(/5\.0 on Google/i)).toBeInTheDocument();
    expect(screen.getByText(/600\+ floors installed/i)).toBeInTheDocument();
  });
});
