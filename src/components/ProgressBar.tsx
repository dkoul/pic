export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
