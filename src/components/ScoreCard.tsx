interface ScoreCardProps {
  craft: number;
  organization: number;
}

export function ScoreCard({ craft, organization }: ScoreCardProps) {
  return (
    <div className="bar-row">
      <div className="bar-item">
        <div className="bar-item-label">
          <span>Craft Identity</span>
          <span>{craft}</span>
        </div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${craft}%` }} />
        </div>
      </div>
      <div className="bar-item">
        <div className="bar-item-label">
          <span>Organizational Identity</span>
          <span>{organization}</span>
        </div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${organization}%` }} />
        </div>
      </div>
    </div>
  );
}
