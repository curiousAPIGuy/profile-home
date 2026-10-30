import './Sidebar.css';
import { Profile, Badge } from '../types';

interface BadgeRowProps {
  badges: Badge[];
}

function BadgeRow({ badges }: BadgeRowProps) {
  return (
    <div className="badge-row">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`badge-item ${badge.type === 'stat' ? 'badge-stat' : ''} ${badge.type === 'more' ? 'badge-more' : ''}`}
          title={badge.label}
        >
          {badge.type === 'stat' ? (
            <>
              <span className="badge-value">{badge.value}</span>
              <span className="badge-label">{badge.label}</span>
            </>
          ) : badge.type === 'achievement' ? (
            <span className="badge-icon">{badge.icon}</span>
          ) : (
            <span className="badge-more-text">{badge.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

interface SidebarProps {
  profile: Profile;
}

export default function Sidebar({ profile }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img
              src={profile.avatarUrl || '/avatar.png'}
              alt={profile.name}
              className="avatar"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallbackTried) {
                  target.dataset.fallbackTried = 'true';
                  target.src = '/self 4.png';
                }
              }}
            />
            {profile.verified && (
              <span className="verified-badge" title="Verified">
                ✓
              </span>
            )}
          </div>
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-bio">{profile.bio}</p>
        </div>

        <BadgeRow badges={profile.badges} />
      </div>
    </aside>
  );
}
