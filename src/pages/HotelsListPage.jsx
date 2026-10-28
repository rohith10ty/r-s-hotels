import React, { useState, useMemo } from 'react';
import { HOTELS_DATA } from '../data/hotelsData';
import { useBooking } from '../context/BookingContext';
import HotelCard from '../components/hotels/HotelCard';
import HotelFilters from '../components/hotels/HotelFilters';
import HotelSort from '../components/hotels/HotelSort';
import SearchConsole from '../components/hero/SearchConsole';
import { Search, MapPin, Calendar, SlidersHorizontal, RotateCcw, Compass } from 'lucide-react';

const HotelsListPage = () => {
  const { searchParams, setSearchParams } = useBooking();

  // Filter States
  const [priceRange, setPriceRange] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Destination quick search in header
  const [searchQuery, setSearchQuery] = useState(searchParams.destination || '');

  const handleResetFilters = () => {
    setPriceRange(3000);
    setMinRating(0);
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setFreeCancellationOnly(false);
    setSortBy('recommended');
    setSearchQuery('');
    setSearchParams(prev => ({ ...prev, destination: '' }));
  };

  // Compute active filters for pills
  const activeFilters = useMemo(() => {
    const list = [];
    if (searchParams.destination) {
      list.push({ id: 'dest', label: `Destination: ${searchParams.destination}` });
    }
    if (priceRange < 3000) {
      list.push({ id: 'price', label: `Up to $${priceRange}/night` });
    }
    if (minRating > 0) {
      list.push({ id: 'rating', label: `${minRating}+ Appraisal` });
    }
    selectedTypes.forEach(t => {
      list.push({ id: `type-${t}`, label: t });
    });
    selectedAmenities.forEach(a => {
      list.push({ id: `amenity-${a}`, label: a });
    });
    if (freeCancellationOnly) {
      list.push({ id: 'cancel', label: 'Free Cancellation' });
    }
    return list;
  }, [searchParams.destination, priceRange, minRating, selectedTypes, selectedAmenities, freeCancellationOnly]);

  const handleRemoveFilter = (filterId) => {
    if (filterId === 'dest') {
      setSearchQuery('');
      setSearchParams(prev => ({ ...prev, destination: '' }));
    } else if (filterId === 'price') {
      setPriceRange(3000);
    } else if (filterId === 'rating') {
      setMinRating(0);
    } else if (filterId === 'cancel') {
      setFreeCancellationOnly(false);
    } else if (filterId.startsWith('type-')) {
      const type = filterId.replace('type-', '');
      setSelectedTypes(prev => prev.filter(t => t !== type));
    } else if (filterId.startsWith('amenity-')) {
      const amenity = filterId.replace('amenity-', '');
      setSelectedAmenities(prev => prev.filter(a => a !== amenity));
    }
  };

  // Filter and Sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let result = [...HOTELS_DATA];

    const targetDest = (searchParams.destination || searchQuery).toLowerCase().trim();
    if (targetDest) {
      result = result.filter(h =>
        h.location.toLowerCase().includes(targetDest) ||
        h.name.toLowerCase().includes(targetDest) ||
        h.neighborhood.toLowerCase().includes(targetDest)
      );
    }

    result = result.filter(h => h.basePrice <= priceRange);

    if (minRating > 0) {
      result = result.filter(h => h.rating >= minRating);
    }

    if (selectedTypes.length > 0) {
      result = result.filter(h => selectedTypes.includes(h.propertyType));
    }

    if (selectedAmenities.length > 0) {
      result = result.filter(h =>
        selectedAmenities.every(a => h.amenities.includes(a))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [searchParams.destination, searchQuery, priceRange, minRating, selectedTypes, selectedAmenities, freeCancellationOnly, sortBy]);

  return (
    <div className="min-h-screen pb-20 pt-6 sm:pt-10 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Frosted Search, Dates & Guests Console */}
        <div className="mb-8">
          <SearchConsole />
        </div>

        {/* Mobile Filter Toggle Button Bar */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-stone-700">
            {filteredAndSortedHotels.length} Sanctuaries Found
          </span>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="px-4 py-2 rounded-xl glass-button-burgundy text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Main Grid: Sidebar Filters + Hotel Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-20">
            <HotelFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              freeCancellationOnly={freeCancellationOnly}
              setFreeCancellationOnly={setFreeCancellationOnly}
              onReset={handleResetFilters}
            />
          </div>

          {/* Mobile Filter Drawer Modal */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
              <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl glass-panel p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/40">
                  <h3 className="font-bold text-burgundy-950">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-stone-500 hover:text-stone-900 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
                <HotelFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  selectedAmenities={selectedAmenities}
                  setSelectedAmenities={setSelectedAmenities}
                  freeCancellationOnly={freeCancellationOnly}
                  setFreeCancellationOnly={setFreeCancellationOnly}
                  onReset={handleResetFilters}
                />
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-2.5 glass-button-burgundy text-white rounded-xl font-bold text-xs"
                >
                  Show {filteredAndSortedHotels.length} Results
                </button>
              </div>
            </div>
          )}

          {/* Listings Column */}
          <div className="lg:col-span-9">
            {/* Sorting & Result Controls */}
            <HotelSort
              resultsCount={filteredAndSortedHotels.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
            />

            {/* Empty State */}
            {filteredAndSortedHotels.length === 0 ? (
              <div className="glass-panel p-12 rounded-2xl text-center space-y-4 my-8">
                <div className="w-14 h-14 rounded-full bg-burgundy-100 text-burgundy-950 mx-auto flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-burgundy-950">No sanctuaries match your criteria</h3>
                <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto font-medium">
                  We could not find any properties under the selected filters. Try broadening your budget or clearing filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="glass-button-burgundy px-6 py-2.5 rounded-lg text-xs font-bold shadow-md inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'space-y-6'
              }>
                {filteredAndSortedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default HotelsListPage;
