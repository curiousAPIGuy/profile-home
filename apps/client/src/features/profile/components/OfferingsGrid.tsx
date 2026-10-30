import OfferingCard from './OfferingCard';
import './OfferingsGrid.css';
import { Offering } from '../types';

interface OfferingsGridProps {
  offerings: Offering[];
}

export default function OfferingsGrid({ offerings }: OfferingsGridProps) {
  return (
    <div className="offerings-grid">
      {offerings.map((offering) => (
        <OfferingCard key={offering.id} offering={offering} />
      ))}
    </div>
  );
}
