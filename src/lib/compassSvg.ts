const INK = '#0e0e0e';
const MID = '#6b6b6b';
const RULE = '#d8d8d4';
const HI = '#f5e642';

export function buildCompassSvg(craft: number, organization: number): string {
  const x = 40 + (craft / 100) * 120;
  const y = 160 - (organization / 100) * 120;

  const ticks = [25, 50, 75]
    .map((pct) => {
      const tx = 40 + (pct / 100) * 120;
      const ty = 160 - (pct / 100) * 120;
      return `<line x1="${tx}" y1="95" x2="${tx}" y2="105" stroke="${RULE}" stroke-width="0.5"/>
              <line x1="95" y1="${ty}" x2="105" y2="${ty}" stroke="${RULE}" stroke-width="0.5"/>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
    <rect width="200" height="200" fill="#fafaf8"/>
    <circle cx="100" cy="100" r="90" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <line x1="100" y1="10" x2="100" y2="190" stroke="${RULE}" stroke-width="1"/>
    <line x1="10" y1="100" x2="190" y2="100" stroke="${RULE}" stroke-width="1"/>
    <text x="145" y="35" text-anchor="middle" font-size="9" fill="${MID}" font-family="monospace">INTEGRATOR</text>
    <text x="55" y="35" text-anchor="middle" font-size="9" fill="${MID}" font-family="monospace">NAVIGATOR</text>
    <text x="145" y="175" text-anchor="middle" font-size="9" fill="${MID}" font-family="monospace">BUILDER</text>
    <text x="55" y="175" text-anchor="middle" font-size="9" fill="${MID}" font-family="monospace">OPERATOR</text>
    <text x="100" y="8" text-anchor="middle" font-size="8" fill="${MID}" font-family="monospace">HIGH ORG</text>
    <text x="100" y="198" text-anchor="middle" font-size="8" fill="${MID}" font-family="monospace">LOW ORG</text>
    <text x="4" y="103" text-anchor="start" font-size="8" fill="${MID}" font-family="monospace">LOW</text>
    <text x="196" y="103" text-anchor="end" font-size="8" fill="${MID}" font-family="monospace">HIGH CRAFT</text>
    ${ticks}
    <circle cx="${x}" cy="${y}" r="8" fill="${HI}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y}" r="3" fill="${INK}"/>
  </svg>`;
}
