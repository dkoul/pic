import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Compass } from '../components/Compass';
import { ProfileCard } from '../components/ProfileCard';
import { ScoreCard } from '../components/ScoreCard';
import { ShareCard } from '../components/ShareCard';
import { profiles } from '../data/profiles';
import type { ProfileType } from '../data/profiles';
import { useAuth } from '../hooks/useAuth';
import { trackEvent } from '../lib/analytics';
import { getLocalAssessmentById, updateLocalReflection } from '../lib/storage';
import { supabase } from '../lib/supabase';
import { useAssessment } from '../hooks/useAssessment';

interface ResultData {
  id: string;
  craftScore: number;
  organizationScore: number;
  profile: ProfileType;
  reflection: string | null;
  publicId: string;
}

export function Results() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { retake } = useAssessment();
  const [result, setResult] = useState<ResultData | null>(null);
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const assessmentId: string = id;

    async function load() {
      if (supabase && user) {
        const { data } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', assessmentId)
          .single();

        if (data) {
          setResult({
            id: data.id,
            craftScore: data.craft_score,
            organizationScore: data.organization_score,
            profile: data.profile as ProfileType,
            reflection: data.reflection,
            publicId: data.public_id ?? data.id,
          });
          setReflection(data.reflection ?? '');
          setLoading(false);
          trackEvent('result_viewed');
          return;
        }
      }

      const local = getLocalAssessmentById(assessmentId);
      if (local) {
        setResult({
          id: local.id,
          craftScore: local.craftScore,
          organizationScore: local.organizationScore,
          profile: local.profile,
          reflection: local.reflection,
          publicId: local.publicId,
        });
        setReflection(local.reflection ?? '');
        trackEvent('result_viewed');
      }
      setLoading(false);
    }

    load();
  }, [id, user]);

  const saveReflection = async () => {
    if (!result || !reflection.trim()) return;

    if (supabase && user) {
      await supabase
        .from('assessments')
        .update({ reflection })
        .eq('id', result.id);
    } else {
      updateLocalReflection(result.id, reflection);
    }
  };

  if (loading) {
    return <div className="empty">Loading your results…</div>;
  }

  if (!result) {
    return (
      <div className="empty">
        Result not found.{' '}
        <button className="back-link" onClick={() => navigate('/assessment')}>Take the assessment</button>
      </div>
    );
  }

  const profile = profiles[result.profile];
  const shareUrl = `${window.location.origin}/share/${result.publicId}`;

  return (
    <div className="results-wrap">
      <div className="results-header">
        <h1>Your Professional Identity Compass</h1>
        <p>
          This is the pattern your answers suggest — not a diagnosis of who you are.
        </p>
      </div>

      <ScoreCard craft={result.craftScore} organization={result.organizationScore} />
      <Compass craft={result.craftScore} organization={result.organizationScore} profile={result.profile} />
      <ProfileCard profile={profile} />

      <div className="reflection-box">
        <h3>{profile.reflectionQuestion}</h3>
        <div className="field">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            onBlur={saveReflection}
            placeholder="Write your reflection here (optional)…"
          />
        </div>
      </div>

      <ShareCard
        profile={profile}
        craft={result.craftScore}
        organization={result.organizationScore}
        shareUrl={shareUrl}
      />

      <div className="np-btns" style={{ marginTop: 32 }}>
        <button
          className="np-btn-fill"
          onClick={() => {
            retake();
            navigate('/assessment');
          }}
        >
          Retake assessment
        </button>
        {user && (
          <button className="np-btn-ghost" onClick={() => navigate('/history')}>
            View history
          </button>
        )}
      </div>
    </div>
  );
}
