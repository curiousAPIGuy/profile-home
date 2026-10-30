import './AboutSection.css';

interface AboutSectionProps {
  about: string;
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="about-section">
      <h2 className="section-heading">About me</h2>
      <p className="about-text">{about}</p>
    </section>
  );
}
