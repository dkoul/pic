import type { Profile } from '../data/profiles';
import { trackEvent } from '../lib/analytics';

interface ShareCardProps {
  profile: Profile;
  craft: number;
  organization: number;
  shareUrl: string;
}

export function ShareCard({ profile, craft, organization, shareUrl }: ShareCardProps) {
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(
    `${profile.name} — Professional Identity Compass\n\nCraft: ${craft} | Organization: ${organization}\n\n${profile.shareSummary}\n\nTake the assessment: ${shareUrl}`,
  )}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    trackEvent('result_shared', { method: 'copy' });
    alert('Link copied to clipboard!');
  };

  const shareLinkedIn = () => {
    trackEvent('result_shared', { method: 'linkedin' });
    window.open(linkedInUrl, '_blank');
  };

  const shareWhatsApp = () => {
    trackEvent('result_shared', { method: 'whatsapp' });
    window.open(whatsAppUrl, '_blank');
  };

  const downloadCard = () => {
    trackEvent('result_shared', { method: 'download' });
    const text = [
      'PROFESSIONAL IDENTITY COMPASS',
      '',
      profile.name.toUpperCase(),
      '',
      `Craft Identity       ${craft}`,
      `Organizational       ${organization}`,
      '',
      profile.shareSummary,
      '',
      `Take the assessment: ${shareUrl}`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'professional-identity-compass.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="share-card">
      <div className="share-card-header">Professional Identity Compass</div>
      <div className="share-card-profile">{profile.name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2 }}>
        <div>Craft Identity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{craft}</div>
        <div>Organizational&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{organization}</div>
      </div>
      <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>
        {profile.shareSummary}
      </p>
      <div className="share-actions">
        <button className="np-btn-fill" onClick={copyLink}>Copy link</button>
        <button className="np-btn-ghost" onClick={shareLinkedIn}>LinkedIn</button>
        <button className="np-btn-ghost" onClick={shareWhatsApp}>WhatsApp</button>
        <button className="np-btn-ghost" onClick={downloadCard}>Download card</button>
      </div>
    </div>
  );
}
