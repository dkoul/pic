type AnalyticsEvent =
  | 'landing_viewed'
  | 'login_started'
  | 'login_completed'
  | 'assessment_started'
  | 'question_answered'
  | 'assessment_completed'
  | 'result_viewed'
  | 'result_shared'
  | 'assessment_retaken';

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number>) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, properties ?? {});
  }

  try {
    const events = JSON.parse(localStorage.getItem('pic_analytics') ?? '[]');
    events.push({ event, properties, timestamp: Date.now() });
    localStorage.setItem('pic_analytics', JSON.stringify(events.slice(-100)));
  } catch {
    // ignore storage errors
  }
}
