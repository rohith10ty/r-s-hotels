import React from 'react';
import { LayoutGrid, List, ArrowUpDown, X } from 'lucide-react';

const HotelSort = ({
  resultsCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeFilters = [],
  onRemoveFilter
}) => {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl shadow-sm">
        {/* Results Counter */}
        <div>
          <h2 className="text-base font-bold text-burgundy-950 flex items-center gap-2">
            <span>Available Sanctuaries</span>
            <span className="text-xs px-2.5 py-0.5 rounded-md glass-panel-dark text-white font-extrabold">
              {resultsCount}
            </span>
          </h2>
          <p className="text-xs text-stone-600 mt-0.5 font-medium">
            Handpicked properties meeting R's global excellence standards
          </p>
        </div>

        {/* Controls: Sort Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700 hidden md:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none glass-button text-stone-900 text-xs font-bold py-2 pl-3 pr-8 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="recommended">Curator's Pick</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Appraisal Score</option>
                <option value="reviews">Most Reviewed</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center glass-pill p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-burgundy-950 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-burgundy-950 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills (if any) */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-600">Active filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md glass-pill text-burgundy-950 text-xs font-bold"
            >
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(filter.id)}
                className="hover:text-rose-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelSort;
