import './FilterTabs.css';

interface FilterTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function FilterTabs({ categories, active, onChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs" role="tablist">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={active === category}
          className={`filter-tab ${active === category ? 'active' : ''}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
