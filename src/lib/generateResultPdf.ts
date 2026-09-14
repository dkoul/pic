import { jsPDF } from 'jspdf';
import type { Profile } from '../data/profiles';
import { buildCompassSvg } from './compassSvg';

const INK = { r: 14, g: 14, b: 14 };
const MID = { r: 107, g: 107, b: 107 };
const INK_LIGHT = { r: 64, g: 64, b: 64 };
const RULE = { r: 216, g: 216, b: 212 };
const BG_TINT = { r: 240, g: 239, b: 232 };

async function svgToDataUrl(svg: string, width: number, height: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.scale(scale, scale);
      ctx.fillStyle = '#fafaf8';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to render compass'));
    };
    img.src = url;
  });
}

function setColor(doc: jsPDF, color: { r: number; g: number; b: number }) {
  doc.setTextColor(color.r, color.g, color.b);
}

function drawScoreBar(
  doc: jsPDF,
  label: string,
  score: number,
  x: number,
  y: number,
  width: number,
): number {
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setColor(doc, MID);
  doc.text(label.toUpperCase(), x, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  setColor(doc, INK);
  doc.text(String(score), x + width, y + 1, { align: 'right' });

  const barY = y + 5;
  doc.setFillColor(RULE.r, RULE.g, RULE.b);
  doc.rect(x, barY, width, 2.5, 'F');

  const fillW = (width * score) / 100;
  if (fillW > 0) {
    doc.setFillColor(INK.r, INK.g, INK.b);
    doc.rect(x, barY, fillW, 2.5, 'F');
  }

  return barY + 8;
}

export interface ResultPdfOptions {
  profile: Profile;
  craft: number;
  organization: number;
  reflection?: string | null;
  shareUrl: string;
}

export async function generateResultPdf(options: ResultPdfOptions): Promise<void> {
  const { profile, craft, organization, reflection, shareUrl } = options;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin - 12) {
      doc.addPage();
      y = margin;
    }
  };

  // Header
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setColor(doc, MID);
  doc.text('PROFESSIONAL IDENTITY COMPASS', margin, y);
  y += 10;

  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  setColor(doc, INK);
  doc.text('Your Professional Identity Compass', margin, y);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, MID);
  const subtitle = doc.splitTextToSize(
    'This is the pattern your answers suggest — not a diagnosis of who you are.',
    contentWidth,
  );
  doc.text(subtitle, margin, y);
  y += subtitle.length * 4.5 + 6;

  doc.setDrawColor(INK.r, INK.g, INK.b);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Profile
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setColor(doc, MID);
  doc.text(profile.tagline.toUpperCase(), margin, y);
  y += 7;

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  setColor(doc, INK);
  doc.text(`You are ${profile.name}`, margin, y);
  y += 12;

  // Scores
  y = drawScoreBar(doc, 'Craft Identity', craft, margin, y, contentWidth);
  y += 4;
  y = drawScoreBar(doc, 'Organizational Identity', organization, margin, y, contentWidth);
  y += 6;

  // Compass diagram
  const compassSize = 72;
  ensureSpace(compassSize + 8);
  const compassSvg = buildCompassSvg(craft, organization);
  const compassImg = await svgToDataUrl(compassSvg, 400, 400);
  const compassX = (pageWidth - compassSize) / 2;
  doc.addImage(compassImg, 'PNG', compassX, y, compassSize, compassSize);
  y += compassSize + 4;

  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  setColor(doc, MID);
  doc.text('CRAFT →', margin, y);
  doc.text('← ORGANIZATIONAL', pageWidth - margin, y, { align: 'right' });
  y += 10;

  // Profile description
  ensureSpace(30);
  doc.setDrawColor(INK.r, INK.g, INK.b);
  doc.setLineWidth(0.3);
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  setColor(doc, INK);
  const descLines = doc.splitTextToSize(profile.description, contentWidth - 10);
  const descHeight = descLines.length * 5 + 10;
  ensureSpace(descHeight);
  doc.rect(margin, y, contentWidth, descHeight);
  doc.text(descLines, margin + 5, y + 7);
  y += descHeight + 8;

  // Thrive in
  ensureSpace(20);
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setColor(doc, MID);
  doc.text('YOU MAY THRIVE IN', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, INK_LIGHT);
  for (const env of profile.environments) {
    ensureSpace(6);
    doc.text(`—  ${env}`, margin + 2, y);
    y += 5;
  }
  y += 6;

  // Blind spot
  ensureSpace(20);
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setColor(doc, MID);
  doc.text('YOUR POTENTIAL BLIND SPOT', margin, y);
  y += 6;

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  const blindLines = doc.splitTextToSize(profile.blindSpot, contentWidth - 10);
  const blindHeight = blindLines.length * 5 + 8;
  ensureSpace(blindHeight);
  doc.setFillColor(BG_TINT.r, BG_TINT.g, BG_TINT.b);
  doc.rect(margin, y, contentWidth, blindHeight, 'F');
  setColor(doc, INK);
  doc.text(blindLines, margin + 5, y + 6);
  y += blindHeight + 10;

  // Reflection
  ensureSpace(25);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  setColor(doc, INK);
  const questionLines = doc.splitTextToSize(profile.reflectionQuestion, contentWidth);
  doc.text(questionLines, margin, y);
  y += questionLines.length * 5 + 4;

  if (reflection?.trim()) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setColor(doc, INK_LIGHT);
    const reflectionLines = doc.splitTextToSize(reflection.trim(), contentWidth);
    ensureSpace(reflectionLines.length * 5);
    doc.text(reflectionLines, margin, y);
    y += reflectionLines.length * 5 + 6;
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    setColor(doc, MID);
    doc.text('(No reflection recorded)', margin, y);
    y += 8;
  }

  // Share summary + URL
  ensureSpace(25);
  doc.setDrawColor(INK.r, INK.g, INK.b);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  setColor(doc, INK);
  const summaryLines = doc.splitTextToSize(profile.shareSummary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 6;

  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setColor(doc, MID);
  doc.text('Take the assessment:', margin, y);
  y += 4;
  doc.setTextColor(14, 14, 14);
  doc.textWithLink(shareUrl, margin, y, { url: shareUrl });
  y += 8;

  // Page footers
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    setColor(doc, MID);
    doc.text(dateStr, margin, pageHeight - 8);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  doc.save('professional-identity-compass.pdf');
}
