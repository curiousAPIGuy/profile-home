import TestimonialCard from './TestimonialCard';
import './RatingsSection.css';
import { Ratings } from '../types';

interface RatingsSectionProps {
  ratings: Ratings;
}

export default function RatingsSection({ ratings }: RatingsSectionProps) {
  const [featured, ...rest] = ratings.reviews;

  return (
    <section className="ratings-section">
      <h2 className="section-heading">Ratings and feedback</h2>

      {/*
      
      <div className="ratings-summary">
        <div className="summary-card summary-illustration">
          <span className="flower-art" aria-hidden="true">🌸</span>
        </div>
        <div className="summary-card summary-rating">
          <span className="summary-value">{ratings.average}/5</span>
          <span className="summary-label">{ratings.totalRatings} ratings</span>
        </div>
        <div className="summary-card summary-testimonials">
          <span className="summary-value">{ratings.totalTestimonials}</span>
          <span className="summary-label">Testimonials</span>
        </div>
      </div>
      
      */}
     
      <div className="testimonials-grid">
        {featured && (
          <div className="testimonial-featured">
            <TestimonialCard review={featured} featured />
          </div>
        )}
        <div className="testimonials-list">
          {rest.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <button type="button" className="show-all-btn">
        Show all reviews
      </button>
    </section>
  );
}
