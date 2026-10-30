import { Sidebar, MainContent, useProfile } from '@/features/profile';
import { LoadingSpinner } from '@/components';
import './styles/App.css';

export default function App() {
  const { profile, offerings, ratings, categories, loading, error } =
    useProfile('ashutosh');

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile || !ratings) {
    return (
      <div className="error-container">
        <h2>Profile Not Found</h2>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar profile={profile} />
      <MainContent
        profile={profile}
        offerings={offerings}
        ratings={ratings}
        categories={categories}
      />
    </div>
  );
}
