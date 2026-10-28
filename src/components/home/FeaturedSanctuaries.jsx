import React, { useState } from 'react';
import { HOTELS_DATA } from '../../data/hotelsData';
import HotelCard from '../hotels/HotelCard';
import { useBooking } from '../../context/BookingContext';
import { ArrowRight, Award } from 'lucide-react';

const CATEGORIES = ['All Curations', 'Palace & Heritage', 'Coastal Villas', 'Alpine Chalets'];

const FeaturedSanctuaries = () => {
  const { navigateTo } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState('All Curations');

  const filteredHotels = HOTELS_DATA.filter(hotel => {
    if (selectedCategory === 'All Curations') return true;
    return hotel.propertyType === selectedCategory;
  }).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-burgundy-950 glass-pill px-3 py-1 rounded-md mb-2">
              <Award className="w-3.5 h-3.5 text-burgundy-800" />
              <span>Signature Residences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-burgundy-950 tracking-tight">
              Curated Masterpieces
            </h2>
            <p className="text-stone-700 text-xs sm:text-sm mt-1 max-w-xl font-medium">
              Each sanctuary is personally vetted by the R's Hospitality Council, offering unmatched privacy and Michelin-grade service.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-burgundy-950 text-white shadow-md'
                    : 'glass-button text-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} viewMode="grid" />
          ))}
        </div>

        {/* Bottom Explore All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('hotels')}
            className="glass-button px-7 py-3 rounded-lg text-xs font-bold text-burgundy-950 inline-flex items-center gap-2 group shadow-sm hover:shadow-md transition-all"
          >
            <span>View All 80+ Luxury Sanctuaries</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSanctuaries;
