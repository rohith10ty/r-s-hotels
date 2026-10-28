import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, calculateNights } from '../../utils/formatters';
import { 
  MapPin, 
  Heart, 
  ChevronRight, 
  Award,
  ShieldCheck 
} from 'lucide-react';

const HotelCard = ({ hotel, viewMode = 'grid' }) => {
  const { navigateTo, openBookingModal, favorites, toggleFavorite, searchParams } = useBooking();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isFavorited = favorites.includes(hotel.id);
  const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);
  const estimatedTotal = hotel.basePrice * nights;

  const handleCardClick = () => {
    navigateTo('hotel-detail', hotel.id);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(hotel.id);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    openBookingModal(hotel);
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-burgundy-950/20 hover:-translate-y-1 cursor-pointer group flex flex-col md:flex-row gap-6 border border-white/60"
      >
        {/* Left: Image */}
        <div className="relative md:w-80 h-64 md:h-auto rounded-xl overflow-hidden flex-shrink-0 shadow-md">
          <img 
            src={hotel.images[activeImageIndex] || hotel.images[0]} 
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {/* Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full glass-pill flex items-center justify-center text-stone-800 hover:text-burgundy-800 transition-colors shadow-md"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-burgundy-700 text-burgundy-700' : ''}`} />
          </button>
          {/* Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md glass-panel-dark text-white text-[10px] font-bold tracking-wider uppercase">
            {hotel.propertyType}
          </div>
        </div>

        {/* Right: Information */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs text-burgundy-900 font-bold">
                <MapPin className="w-3.5 h-3.5 text-burgundy-700" />
                <span>{hotel.location}</span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-600 font-medium">{hotel.neighborhood}</span>
              </div>
              <div className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-md text-burgundy-950 font-black text-xs">
                <span className="text-[10px] text-stone-500 font-semibold uppercase">Score</span>
                <span>{hotel.rating}</span>
                <span className="text-stone-400 font-normal">({hotel.reviewsCount})</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-burgundy-950 tracking-tight group-hover:text-burgundy-800 transition-colors">
              {hotel.name}
            </h3>
            <p className="text-stone-700 text-xs sm:text-sm mt-1 line-clamp-2 font-medium">
              {hotel.description}
            </p>

            {/* Amenities Chips */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {hotel.amenities.slice(0, 4).map((amenity) => (
                <span key={amenity} className="px-2.5 py-0.5 rounded-md glass-pill text-burgundy-950 text-[10px] font-semibold">
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="px-2 py-0.5 text-[10px] text-stone-600 font-semibold">
                  +{hotel.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-end justify-between pt-4 mt-4 border-t border-white/50">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">
                Starting from
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-burgundy-950">
                  {formatCurrency(hotel.basePrice)}
                </span>
                <span className="text-xs text-stone-600 font-medium">/ night</span>
              </div>
              <div className="text-[11px] text-stone-600 font-medium">
                {formatCurrency(estimatedTotal)} for {nights} {nights === 1 ? 'night' : 'nights'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCardClick}
                className="px-4 py-2 rounded-lg glass-button text-xs font-bold text-burgundy-950"
              >
                View Details
              </button>
              <button
                onClick={handleBookClick}
                className="glass-button-burgundy px-5 py-2 rounded-lg text-xs font-bold tracking-wide shadow-md"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Rectangle frosted glass card)
  return (
    <div 
      onClick={handleCardClick}
      className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-burgundy-950/20 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between border border-white/60 p-3 sm:p-4"
    >
      {/* Top Image Preview */}
      <div className="relative h-44 sm:h-60 rounded-xl overflow-hidden shadow-sm">
        <img 
          src={hotel.images[activeImageIndex] || hotel.images[0]} 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20 pointer-events-none" />

        {/* Badges on Image */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <div className="px-2.5 py-1 rounded-md glass-panel-dark text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-white/30">
            <Award className="w-3 h-3 text-amber-300" />
            <span>{hotel.propertyType}</span>
          </div>

          <button
            onClick={handleFavoriteClick}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-stone-800 hover:text-burgundy-800 transition-colors shadow-md group/heart"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 transition-transform group-hover/heart:scale-110 ${isFavorited ? 'fill-burgundy-700 text-burgundy-700' : ''}`} />
          </button>
        </div>

        {/* Dots Preview */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
            {hotel.images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Show image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="pt-4 pb-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Score */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1 text-burgundy-900 font-bold">
              <MapPin className="w-3.5 h-3.5 text-burgundy-700" />
              <span>{hotel.location}</span>
            </div>
            <div className="flex items-center gap-1 glass-pill px-2 py-0.5 rounded-md text-burgundy-950 font-black text-[11px]">
              <span className="text-[9px] text-stone-500 uppercase font-semibold">Score</span>
              <span>{hotel.rating}</span>
            </div>
          </div>

          {/* Hotel Name */}
          <h3 className="text-lg sm:text-xl font-black text-burgundy-950 tracking-tight group-hover:text-burgundy-800 transition-colors">
            {hotel.name}
          </h3>
          <p className="text-stone-700 text-xs mt-1 line-clamp-2 font-medium">
            {hotel.tagline}
          </p>

          {/* Key Amenities */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="px-2 py-0.5 rounded-md glass-pill text-burgundy-950 text-[10px] font-semibold">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3.5 mt-3.5 border-t border-white/50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-burgundy-950">
                {formatCurrency(hotel.basePrice)}
              </span>
              <span className="text-xs text-stone-600 font-medium">/ night</span>
            </div>
            <span className="text-[10px] text-stone-600 font-medium">
              {formatCurrency(estimatedTotal)} for {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </div>

          <button
            onClick={handleBookClick}
            className="glass-button-burgundy px-4 py-2 rounded-lg text-xs font-bold tracking-wide shadow-md flex items-center gap-1 group/btn"
          >
            <span>Book</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
