import type { ProfileType } from '../data/profiles';

interface CompassProps {
  craft: number;
  organization: number;
  profile: ProfileType;
}

const profileLabels: Record<ProfileType, { label: string; x: number; y: number }> = {
  builder: { label: 'Builder', x: 75, y: 75 },
  navigator: { label: 'Navigator', x: 25, y: 25 },
  integrator: { label: 'Integrator', x: 75, y: 25 },
  operator: { label: 'Operator', x: 25, y: 75 },
};

export function Compass({ craft, organization, profile }: CompassProps) {
  const x = 40 + (craft / 100) * 120;
  const y = 160 - (organization / 100) * 120;

  return (
    <div className="compass-container">
      <svg className="compass-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

        {/* Cross axes */}
        <line x1="100" y1="10" x2="100" y2="190" stroke="var(--rule)" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="var(--rule)" strokeWidth="1" />

        {/* Quadrant labels */}
        <text x="145" y="35" textAnchor="middle" fontSize="9" fill="var(--mid)" fontFamily="var(--font-mono)">
          INTEGRATOR
        </text>
        <text x="55" y="35" textAnchor="middle" fontSize="9" fill="var(--mid)" fontFamily="var(--font-mono)">
          NAVIGATOR
        </text>
        <text x="145" y="175" textAnchor="middle" fontSize="9" fill="var(--mid)" fontFamily="var(--font-mono)">
          BUILDER
        </text>
        <text x="55" y="175" textAnchor="middle" fontSize="9" fill="var(--mid)" fontFamily="var(--font-mono)">
          OPERATOR
        </text>

        {/* Axis labels */}
        <text x="100" y="8" textAnchor="middle" fontSize="8" fill="var(--mid)" fontFamily="var(--font-mono)">
          HIGH ORG
        </text>
        <text x="100" y="198" textAnchor="middle" fontSize="8" fill="var(--mid)" fontFamily="var(--font-mono)">
          LOW ORG
        </text>
        <text x="4" y="103" textAnchor="start" fontSize="8" fill="var(--mid)" fontFamily="var(--font-mono)">
          LOW
        </text>
        <text x="196" y="103" textAnchor="end" fontSize="8" fill="var(--mid)" fontFamily="var(--font-mono)">
          HIGH CRAFT
        </text>

        {/* Hand-drawn style tick marks */}
        {[25, 50, 75].map((pct) => {
          const tx = 40 + (pct / 100) * 120;
          const ty = 160 - (pct / 100) * 120;
          return (
            <g key={pct}>
              <line x1={tx} y1="95" x2={tx} y2="105" stroke="var(--rule)" strokeWidth="0.5" />
              <line x1="95" y1={ty} x2="105" y2={ty} stroke="var(--rule)" strokeWidth="0.5" />
            </g>
          );
        })}

        {/* User position */}
        <circle cx={x} cy={y} r="8" fill="var(--hi)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx={x} cy={y} r="3" fill="var(--ink)" />

        {/* Profile highlight ring */}
        <circle
          cx={profileLabels[profile].x * 2}
          cy={profileLabels[profile].y * 2}
          r="0"
          fill="none"
        />
      </svg>
    </div>
  );
}
