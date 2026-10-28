import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { Filter, RotateCcw, Check, ShieldCheck, Award } from 'lucide-react';

const PROPERTY_TYPES = [
  "Palace & Heritage",
  "Coastal Villas",
  "Alpine Chalets",
  "Urban Penthouses",
  "Boutique Hotels"
];

const POPULAR_AMENITIES = [
  "Infinity Pool",
  "Spa & Wellness",
  "Michelin Key Dining",
  "Private Butler",
  "Ocean View",
  "Helipad Access",
  "High-Speed WiFi",
  "Chauffeur Service",
  "Pet Concierge"
];

const HotelFilters = ({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  selectedTypes,
  setSelectedTypes,
  selectedAmenities,
  setSelectedAmenities,
  freeCancellationOnly,
  setFreeCancellationOnly,
  onReset
}) => {
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-5 border border-white/70 shadow-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/40">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-burgundy-800" />
          <h3 className="font-bold text-burgundy-950 text-sm uppercase tracking-wider">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-burgundy-800 hover:text-burgundy-950 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* 1. Price Per Night Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950">
            Nightly Rate
          </label>
          <span className="text-xs font-bold text-burgundy-950 glass-pill px-2.5 py-0.5 rounded-md">
            Up to {formatCurrency(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="3000"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-burgundy-800 cursor-pointer h-2 bg-white/60 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-stone-500 font-bold mt-1">
          <span>$500</span>
          <span>$1,750</span>
          <span>$3,000+</span>
        </div>
      </div>

      {/* 2. Minimum Rating */}
      <div className="pt-3.5 border-t border-white/40">
        <label className="block text-xs font-bold uppercase tracking-wider text-burgundy-950 mb-2">
          Appraisal Score
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Any', value: 0 },
            { label: '4.90+', value: 4.9 },
            { label: '4.95+', value: 4.95 }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setMinRating(item.value)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                minRating === item.value
                  ? 'bg-burgundy-950 text-white shadow-sm'
                  : 'glass-button text-stone-800'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Property Type */}
      <div className="pt-3.5 border-t border-white/40">
        <label className="block text-xs font-bold uppercase tracking-wider text-burgundy-950 mb-2.5">
          Sanctuary Collection
        </label>
        <div className="space-y-1.5">
          {PROPERTY_TYPES.map((type) => {
            const isChecked = selectedTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-xs text-stone-800 font-semibold cursor-pointer hover:text-burgundy-950 select-none"
              >
                <div
                  onClick={() => handleTypeToggle(type)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-burgundy-950 border-burgundy-950 text-white'
                      : 'border-stone-400 bg-white/70'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span onClick={() => handleTypeToggle(type)}>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Luxury Amenities */}
      <div className="pt-3.5 border-t border-white/40">
        <label className="block text-xs font-bold uppercase tracking-wider text-burgundy-950 mb-2.5">
          Luxury Amenities
        </label>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {POPULAR_AMENITIES.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-stone-800 font-semibold cursor-pointer hover:text-burgundy-950 select-none"
              >
                <div
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-burgundy-950 border-burgundy-950 text-white'
                      : 'border-stone-400 bg-white/70'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span onClick={() => handleAmenityToggle(amenity)}>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Free Cancellation Toggle */}
      <div className="pt-3.5 border-t border-white/40">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <div>
            <div className="text-xs font-bold text-burgundy-950">Flexible Cancellation</div>
            <div className="text-[10px] text-stone-600 font-medium">Free cancellation eligibility</div>
          </div>
          <button
            type="button"
            onClick={() => setFreeCancellationOnly(!freeCancellationOnly)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
              freeCancellationOnly ? 'bg-burgundy-950' : 'bg-stone-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                freeCancellationOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  );
};

export default HotelFilters;
