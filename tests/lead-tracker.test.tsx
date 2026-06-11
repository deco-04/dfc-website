import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { LeadTracker } from '@/components/lead-tracker';

interface WindowWithDataLayer extends Window {
  dataLayer?: Record<string, unknown>[];
}

describe('LeadTracker', () => {
  beforeEach(() => {
    sessionStorage.clear();
    (window as WindowWithDataLayer).dataLayer = [];
  });

  it('renders nothing visible', () => {
    const { container } = render(<LeadTracker source="default" />);
    expect(container.firstChild).toBeNull();
  });

  it('pushes exactly one lead_submit event with the given source', () => {
    render(<LeadTracker source="remote-estimate" />);
    const dl = (window as WindowWithDataLayer).dataLayer ?? [];
    const events = dl.filter((e) => e.event === 'lead_submit');
    expect(events).toHaveLength(1);
    expect(events[0].lead_source).toBe('remote-estimate');
  });

  it('includes utm_source from sessionStorage when present', () => {
    sessionStorage.setItem('dfc_utm', JSON.stringify({ utm_source: 'google', utm_medium: 'cpc' }));
    render(<LeadTracker source="google" />);
    const dl = (window as WindowWithDataLayer).dataLayer ?? [];
    const event = dl.find((e) => e.event === 'lead_submit');
    expect(event?.utm_source).toBe('google');
    expect(event?.utm_medium).toBe('cpc');
  });

  it('does not double-push on re-render', () => {
    const { rerender } = render(<LeadTracker source="meta" />);
    rerender(<LeadTracker source="meta" />);
    const dl = (window as WindowWithDataLayer).dataLayer ?? [];
    const events = dl.filter((e) => e.event === 'lead_submit');
    expect(events).toHaveLength(1);
  });
});
