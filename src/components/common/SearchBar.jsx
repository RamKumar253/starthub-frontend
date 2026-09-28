import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  id,
}) {
  const handleClear = () => {
    if (onClear) onClear();
    else onChange && onChange({ target: { value: '' } });
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field pl-10 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700 transition-colors flex items-center justify-center"
          aria-label="Clear search"
        >
          <X size={11} />
        </button>
      )}
    </div>
  );
}
