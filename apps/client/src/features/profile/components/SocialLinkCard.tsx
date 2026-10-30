import './SocialLinkCard.css';
import { SocialLink } from '../types';

interface SocialLinkCardProps {
  link: SocialLink;
  name: string;
}

export default function SocialLinkCard({ link, name }: SocialLinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link-card"
    >
      <div className="social-link-info">
        <span className="social-link-name">{name}</span>
        <span className="social-link-url">{link.displayUrl}</span>
      </div>
      <span className="social-link-icon" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
