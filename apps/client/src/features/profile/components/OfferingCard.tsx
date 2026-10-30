import './OfferingCard.css';
import { Offering, OfferingItem } from '../types';

interface PackageItemsProps {
  items: OfferingItem[];
}

function PackageItems({ items }: PackageItemsProps) {
  return (
    <ul className="package-items">
      {items.map((item) => (
        <li key={item.id} className="package-item">
          <span className="package-item-title">{item.title}</span>
          <span className="package-item-qty">× {item.quantity}</span>
        </li>
      ))}
    </ul>
  );
}

interface OfferingCardProps {
  offering: Offering;
}

export default function OfferingCard({ offering }: OfferingCardProps) {
  const isPackage = offering.type === 'package';

  return (
    <article className={`offering-card ${isPackage ? 'offering-package' : ''}`}>
      <div className="offering-header">
        <span className="offering-category">{offering.category}</span>
        {offering.rating && (
          <span className="offering-rating">★ {offering.rating}</span>
        )}
      </div>

      <h3 className="offering-title">{offering.title}</h3>

      {offering.description && (
        <p className="offering-description">{offering.description}</p>
      )}

      {isPackage && offering.items && <PackageItems items={offering.items} />}

      <div className="offering-footer">
        <div className="offering-pricing">
          {offering.badge && (
            <span className={`offering-badge badge-${offering.badgeColor}`}>
              {offering.badge}
            </span>
          )}
          <div className="price-row">
            <span className="price-current">
              {offering.currency}{offering.price}
            </span>
            {offering.originalPrice && (
              <span className="price-original">
                {offering.currency}{offering.originalPrice}
              </span>
            )}
          </div>
        </div>
        <button type="button" className="offering-action" aria-label="View offering">
          →
        </button>
      </div>
    </article>
  );
}
