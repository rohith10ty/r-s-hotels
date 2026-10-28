import React from 'react';
import { DESTINATIONS } from '../../data/hotelsData';
import { useBooking } from '../../context/BookingContext';
import { MapPin, ArrowRight, Compass } from 'lucide-react';

const CuratedCollections = () => {
  const { setSearchParams, navigateTo } = useBooking();

  const handleSelectDestination = (destName) => {
    setSearchParams(prev => ({
      ...prev,
      destination: destName
    }));
    navigateTo('hotels');
  };

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-burgundy-950 glass-pill px-3 py-1 rounded-md mb-2">
            <Compass className="w-3.5 h-3.5 text-burgundy-800" />
            <span>Iconic Havens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-burgundy-950 tracking-tight">
            Discover by Destination
          </h2>
          <p className="text-stone-700 text-xs sm:text-sm mt-1 font-medium">
            Explore world-renowned sanctuaries steeped in romantic history, pristine nature, and architectural wonder.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              onClick={() => handleSelectDestination(dest.name)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-white/60"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/30 to-transparent group-hover:from-burgundy-950/95 transition-colors" />

              {/* Content */}
              <div className="absolute bottom-3.5 inset-x-3.5 text-white">
                <span className="text-[9px] uppercase font-bold tracking-widest text-rose-200/90 block">
                  {dest.country}
                </span>
                <h4 className="text-base sm:text-lg font-black tracking-tight mt-0.5 group-hover:text-rose-100">
                  {dest.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-rose-200/80 mt-1 font-semibold">
                  <span>{dest.propertiesCount} Stays</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CuratedCollections;
