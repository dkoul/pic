import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Compass } from '../components/Compass';
import { ScoreCard } from '../components/ScoreCard';
import { profiles } from '../data/profiles';
import type { ProfileType } from '../data/profiles';
import { getLocalAssessmentByPublicId } from '../lib/storage';
import { supabase } from '../lib/supabase';

interface ShareData {
  craftScore: number;
  organizationScore: number;
  profile: ProfileType;
}

export function Share() {
  const { publicId } = useParams<{ publicId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicId) return;
    const shareId: string = publicId;

    async function load() {
      if (supabase) {
        const { data: record } = await supabase
          .from('assessments')
          .select('craft_score, organization_score, profile')
          .eq('public_id', shareId)
          .single();

        if (record) {
          setData({
            craftScore: record.craft_score,
            organizationScore: record.organization_score,
            profile: record.profile as ProfileType,
          });
          setLoading(false);
          return;
        }
      }

      const local = getLocalAssessmentByPublicId(shareId);
      if (local) {
        setData({
          craftScore: local.craftScore,
          organizationScore: local.organizationScore,
          profile: local.profile,
        });
      }
      setLoading(false);
    }

    load();
  }, [publicId]);

  if (loading) return <div className="empty">Loading…</div>;
  if (!data) return <div className="empty">Shared result not found.</div>;

  const profile = profiles[data.profile];

  return (
    <div className="results-wrap">
      <div className="results-header">
        <div className="form-kicker">Professional Identity Compass</div>
        <h1>{profile.name}</h1>
        <p style={{ fontStyle: 'italic' }}>{profile.shareSummary}</p>
      </div>

      <ScoreCard craft={data.craftScore} organization={data.organizationScore} />
      <Compass craft={data.craftScore} organization={data.organizationScore} profile={data.profile} />

      <div className="cta-band" style={{ padding: 0, marginTop: 40 }}>
        <div className="cta-card">
          <div>
            <h2>Discover your own compass</h2>
            <p>20 questions · About 5 minutes</p>
          </div>
          <button className="np-btn-fill" onClick={() => navigate('/assessment')}>
            Take the assessment
          </button>
        </div>
      </div>
    </div>
  );
}
