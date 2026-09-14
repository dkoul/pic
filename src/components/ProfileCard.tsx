import type { Profile } from '../data/profiles';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="profile-tag">{profile.tagline}</div>
      <h2>You are {profile.name}</h2>
      <blockquote>{profile.description}</blockquote>

      <div className="profile-section">
        <h4>You may thrive in</h4>
        <ul>
          {profile.environments.map((env) => (
            <li key={env}>{env}</li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h4>Your potential blind spot</h4>
        <div className="blind-spot">{profile.blindSpot}</div>
      </div>
    </div>
  );
}
