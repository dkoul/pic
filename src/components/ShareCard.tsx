import { useState } from 'react';
import type { Profile } from '../data/profiles';
import { trackEvent } from '../lib/analytics';

interface ShareCardProps {
  profile: Profile;
  craft: number;
  organization: number;
  shareUrl: string;
  reflection?: string | null;
}

export function ShareCard({ profile, craft, organization, shareUrl, reflection }: ShareCardProps) {
  const [downloading, setDownloading] = useState(false);

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

  const downloadCard = async () => {
    setDownloading(true);
    try {
      trackEvent('result_shared', { method: 'download' });
      const { generateResultPdf } = await import('../lib/generateResultPdf');
      await generateResultPdf({
        profile,
        craft,
        organization,
        reflection,
        shareUrl,
      });
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Could not generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
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
        <button className="np-btn-ghost" onClick={downloadCard} disabled={downloading}>
          {downloading ? 'Generating PDF…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
