import './TestimonialCard.css';
import { Review } from '../types';

interface TestimonialCardProps {
  review: Review;
  featured?: boolean;
}

export default function TestimonialCard({ review, featured = false }: TestimonialCardProps) {
  return (
    <article className={`testimonial-card ${featured ? 'featured' : ''}`}>
      <div className="testimonial-rating">★ {review.rating}/5</div>
      <p className="testimonial-text">{review.text}</p>
      <div className="testimonial-author">
        <span className="author-name">{review.author}</span>
        <span className="author-date">{review.date}</span>
      </div>
    </article>
  );
}
