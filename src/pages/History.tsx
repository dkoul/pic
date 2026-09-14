import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profiles } from '../data/profiles';
import type { ProfileType } from '../data/profiles';
import { useAuth } from '../hooks/useAuth';
import { getLocalAssessments } from '../lib/storage';
import { supabase } from '../lib/supabase';

interface HistoryItem {
  id: string;
  createdAt: string;
  craftScore: number;
  organizationScore: number;
  profile: ProfileType;
}

export function History() {
  const navigate = useNavigate();
  const { user, signInWithGoogle, loading: authLoading } = useAuth();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (supabase && user) {
        const { data } = await supabase
          .from('assessments')
          .select('id, created_at, craft_score, organization_score, profile')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          setItems(
            data.map((d) => ({
              id: d.id,
              createdAt: d.created_at,
              craftScore: d.craft_score,
              organizationScore: d.organization_score,
              profile: d.profile as ProfileType,
            })),
          );
        }
      } else {
        setItems(
          getLocalAssessments().map((a) => ({
            id: a.id,
            createdAt: a.createdAt,
            craftScore: a.craftScore,
            organizationScore: a.organizationScore,
            profile: a.profile,
          })),
        );
      }
      setLoading(false);
    }

    if (!authLoading) load();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <div className="empty">Loading your compass history…</div>;
  }

  if (!user && items.length === 0) {
    return (
      <div className="login-wrap">
        <h1>My Compass</h1>
        <p>Sign in to save and view your assessment history across devices.</p>
        <button className="np-btn-fill" onClick={signInWithGoogle}>Continue with Google</button>
        <p className="disclaimer">
          Without signing in, results are stored locally in your browser only.
        </p>
      </div>
    );
  }

  return (
    <div className="page-hero">
      <h1>My Compass</h1>
      <p>Your assessment history — a reflection tool over time.</p>

      {items.length === 0 ? (
        <div className="empty">
          No assessments yet.{' '}
          <button className="back-link" onClick={() => navigate('/assessment')}>Take your first assessment</button>
        </div>
      ) : (
        <div className="history-list">
          {items.map((item) => (
            <button
              key={item.id}
              className="history-item"
              onClick={() => navigate(`/results/${item.id}`)}
            >
              <div>
                <div className="history-date">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <div className="history-profile">{profiles[item.profile].name}</div>
              </div>
              <div className="history-scores">
                Craft {item.craftScore} | Organization {item.organizationScore}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="np-btns" style={{ marginTop: 32 }}>
        <button className="np-btn-fill" onClick={() => navigate('/assessment')}>
          Take new assessment
        </button>
      </div>
    </div>
  );
}
