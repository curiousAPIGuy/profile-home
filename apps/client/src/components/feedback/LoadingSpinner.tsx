import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading profile…</p>
    </div>
  );
}
