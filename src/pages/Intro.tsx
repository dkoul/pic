import { useNavigate } from 'react-router-dom';

const crisisData = [
  { situation: 'Technological disruption', craft: 'Learn and adapt', org: 'Influence adoption' },
  { situation: 'Recession', craft: 'Transferable skills', org: 'Relationships and influence' },
  { situation: 'Layoff', craft: 'Skills travel with you', org: 'Network may open doors' },
  { situation: 'Reorganization', craft: 'Less dependent on structure', org: 'Role may change or disappear' },
  { situation: 'New company', craft: 'Expertise transfers', org: 'Context must be rebuilt' },
  { situation: 'Crisis', craft: 'Solve hard problems', org: 'Coordinate people' },
  { situation: 'Rapid growth', craft: 'Build capability', org: 'Build organizational capacity' },
  { situation: 'Stable organization', craft: 'Deepen mastery', org: 'Build influence' },
];

export function Intro() {
  const navigate = useNavigate();

  return (
    <>
      <section className="page-hero">
        <h1>Understand the <em>two identities</em></h1>
        <p>
          Before taking the assessment, explore the model. Your profession does not necessarily
          determine your professional identity.
        </p>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="identity-grid">
          <div className="identity-card">
            <h3>Craft Identity</h3>
            <p className="tagline">"I am valuable because of what I can do."</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-light)' }}>
              Craft-oriented people build their professional identity around mastery, knowledge,
              skill, and solving difficult problems.
            </p>
            <p className="question">"How can I get better at this?"</p>
            <h4>Strengths</h4>
            <ul>
              <li>Deep expertise</li>
              <li>Continuous learning</li>
              <li>Transferable skills</li>
              <li>Strong problem solving</li>
              <li>Curiosity and independence</li>
              <li>Credibility based on demonstrated competence</li>
            </ul>
            <h4>Potential weaknesses</h4>
            <ul>
              <li>Can become overly attached to expertise</li>
              <li>May underestimate relationships and organizational politics</li>
              <li>Can struggle when influence matters more than technical correctness</li>
              <li>Expertise can become obsolete</li>
            </ul>
          </div>

          <div className="identity-card">
            <h3>Organizational Identity</h3>
            <p className="tagline">"I am valuable because of the responsibility and influence I carry."</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-light)' }}>
              Organizationally oriented people build their professional identity around leadership,
              relationships, responsibility, coordination, and understanding complex systems.
            </p>
            <p className="question">"How do I get people and resources moving in the right direction?"</p>
            <h4>Strengths</h4>
            <ul>
              <li>Strong relationships</li>
              <li>Organizational awareness</li>
              <li>Leadership and influence</li>
              <li>Coordination and stakeholder management</li>
              <li>Comfort with ambiguity</li>
              <li>Ability to navigate complex systems</li>
            </ul>
            <h4>Potential weaknesses</h4>
            <ul>
              <li>Expertise can become dependent on organizational context</li>
              <li>Networks may weaken after changing organizations</li>
              <li>Status and title can become part of identity</li>
              <li>Influence can disappear when the role disappears</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2 className="sec-h2">Identity during <em>crisis</em></h2>
          <p className="sec-desc">
            How each identity responds when the world around you changes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          <div style={{ padding: '20px 24px', border: '1px solid var(--rule)' }}>
            <div className="form-kicker">Craft Identity asks</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic' }}>
              "What can I do that remains valuable?"
            </p>
          </div>
          <div style={{ padding: '20px 24px', border: '1px solid var(--rule)' }}>
            <div className="form-kicker">Organizational Identity asks</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic' }}>
              "Who needs me, and where can I create influence?"
            </p>
          </div>
        </div>

        <table className="crisis-table">
          <thead>
            <tr>
              <th>Situation</th>
              <th>Craft Identity</th>
              <th>Organizational Identity</th>
            </tr>
          </thead>
          <tbody>
            {crisisData.map((row) => (
              <tr key={row.situation}>
                <td>{row.situation}</td>
                <td>{row.craft}</td>
                <td>{row.org}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="crisis-insight">
          <p><strong>Craft can become obsolete.</strong></p>
          <p><strong>Organizational influence can become structurally irrelevant.</strong></p>
          <p style={{ marginTop: 12, fontStyle: 'italic', fontSize: 16 }}>
            The most resilient professional may therefore be someone who develops both.
          </p>
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-card">
          <div>
            <h2>Take the assessment</h2>
            <p>Discover where you locate competence, meaning, and professional belonging.</p>
          </div>
          <button className="np-btn-fill" onClick={() => navigate('/assessment')}>
            Discover My Compass
          </button>
        </div>
      </div>
    </>
  );
}
