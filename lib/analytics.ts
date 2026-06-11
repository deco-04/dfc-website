'use client';

interface WindowWithDataLayer extends Window {
  dataLayer?: Record<string, unknown>[];
}

export function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as WindowWithDataLayer;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
}

export function trackPhoneClick() {
  trackEvent('phone_click', { phone_number: '720-599-1664' });
}

export function trackCalendarBook(payload: Record<string, unknown> = {}) {
  trackEvent('calendar_book', payload);
}
