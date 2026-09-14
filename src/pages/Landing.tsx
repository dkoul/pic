import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

export function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent('landing_viewed');
  }, []);

  return (
    <>
      <section className="np-hero">
        <div className="np-kicker">
          <span className="np-live-dot" />
          Self-reflection assessment
        </div>
        <h1 className="np-h1">Professional Identity Compass</h1>
        <p className="np-sub">
          <strong>What gives your professional life meaning?</strong>
          <br /><br />
          Some people are drawn to mastery.
          <br />
          Others are drawn to influence.
          <br />
          Some want to become better at the craft.
          <br />
          Others want to become better at navigating people and systems.
          <br /><br />
          Most of us are somewhere in between.
        </p>
        <div className="np-btns">
          <button className="np-btn-fill" onClick={() => navigate('/assessment')}>
            Discover My Compass
          </button>
          <button className="np-btn-ghost" onClick={() => navigate('/intro')}>
            How does this work?
          </button>
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2 className="sec-h2">When the world around you <em>changes</em></h2>
          <p className="sec-desc">
            The entire experience revolves around one question: what part of your professional identity survives?
          </p>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-light)', maxWidth: 640 }}>
          This is not a clinical psychological test. It is a self-reflection assessment for exploring
          professional identity — describing patterns in your responses, not objective truths about you.
        </p>
      </section>

      <div className="cta-band">
        <div className="cta-card">
          <div>
            <h2>Ready to explore your compass?</h2>
            <p>20 questions · About 5 minutes · No right or wrong answers</p>
          </div>
          <button className="np-btn-fill" onClick={() => navigate('/assessment')}>
            Begin assessment
          </button>
        </div>
      </div>
    </>
  );
}
