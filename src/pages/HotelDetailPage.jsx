import React, { useEffect, useState } from 'react';
import { HOTELS_DATA } from '../data/hotelsData';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, calculateNights } from '../utils/formatters';
import { 
  ChevronLeft, 
  MapPin, 
  Heart, 
  Share2, 
  Check, 
  ShieldCheck, 
  Users, 
  Award,
  Wifi,
  Coffee,
  Waves,
  Utensils,
  Car,
  Wine
} from 'lucide-react';

const HotelDetailPage = () => {
  const { 
    selectedHotelId, 
    navigateTo, 
    openBookingModal, 
    favorites, 
    toggleFavorite, 
    searchParams,
    showToast 
  } = useBooking();

  const hotel = HOTELS_DATA.find(h => h.id === selectedHotelId) || HOTELS_DATA[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [hotel.id]);

  const isFavorited = favorites.includes(hotel.id);
  const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: hotel.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Sanctuary link copied to clipboard.');
    }
  };

  const getAmenityIcon = (name) => {
    switch (name) {
      case 'Infinity Pool':
      case 'Ocean View':
        return <Waves className="w-4 h-4 text-burgundy-700" />;
      case 'Michelin Star Dining':
      case 'Michelin Key Dining':
        return <Utensils className="w-4 h-4 text-burgundy-700" />;
      case 'High-Speed WiFi':
        return <Wifi className="w-4 h-4 text-burgundy-700" />;
      case 'Chauffeur Service':
      case 'Helipad Access':
        return <Car className="w-4 h-4 text-burgundy-700" />;
      case 'Champagne Cellar':
        return <Wine className="w-4 h-4 text-burgundy-700" />;
      default:
        return <Award className="w-4 h-4 text-burgundy-700" />;
    }
  };

  return (
    <div className="pt-20 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('hotels')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy-950 hover:underline transition-colors uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Sanctuaries</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg glass-button hover:bg-white text-stone-700 transition-colors shadow-sm"
              title="Share Sanctuary"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(hotel.id)}
              className="p-2.5 rounded-lg glass-button hover:bg-white text-stone-700 transition-colors shadow-sm"
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-burgundy-700 text-burgundy-700' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hotel Header Title & Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md glass-panel-dark text-white text-[11px] font-bold uppercase tracking-wider">
                {hotel.propertyType}
              </span>
              <span className="px-3 py-1 rounded-md glass-pill text-burgundy-950 text-[11px] font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{hotel.michelinKeys} Michelin Keys</span>
              </span>
              <span className="px-3 py-1 rounded-md glass-pill text-stone-800 text-[11px] font-semibold">
                R's Certified Luxury
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-burgundy-950 tracking-tight">
              {hotel.name}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 font-medium mt-2">
              <MapPin className="w-4 h-4 text-burgundy-700 flex-shrink-0" />
              <span className="font-bold text-stone-900">{hotel.location}</span>
              <span className="text-stone-300">•</span>
              <span>{hotel.neighborhood}</span>
            </div>
          </div>

          {/* Rating Snapshot */}
          <div className="flex items-center gap-3 glass-panel p-3 rounded-xl border border-white/80 self-start md:self-auto">
            <div className="w-12 h-12 rounded-lg bg-burgundy-950 text-white font-black text-lg flex items-center justify-center">
              {hotel.rating}
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">
                Exceptional Sanctuary
              </div>
              <div className="text-[11px] text-stone-600 font-medium">{hotel.reviewsCount} verified appraisals</div>
            </div>
          </div>
        </div>

        {/* Luxury Photo Gallery Grid */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden shadow-2xl border border-white/80 md:h-[480px] md:grid-cols-4 md:grid-rows-2">
          {/* Main Large Image */}
          <div className="relative col-span-2 h-72 cursor-pointer group overflow-hidden md:row-span-2 md:h-full">
            <img
              src={hotel.images[activeImageIndex] || hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-md glass-panel text-white text-xs font-semibold backdrop-blur-md">
              Primary View
            </div>
          </div>

          {/* Thumbnails fill the available gallery space for each hotel's image count. */}
          {hotel.images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx + 1)}
              className={[
                'relative h-32 cursor-pointer group overflow-hidden md:h-full',
                hotel.images.length === 2 && 'col-span-2 md:row-span-2',
                hotel.images.length === 3 && 'md:row-span-2',
                hotel.images.length === 4 && idx === 2 && 'col-span-2'
              ].filter(Boolean).join(' ')}
            >
              <img
                src={img}
                alt={`${hotel.name} view ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 transition-colors ${
                activeImageIndex === idx + 1 ? 'ring-4 ring-inset ring-burgundy-700 bg-black/10' : 'bg-black/15 group-hover:bg-transparent'
              }`} />
            </div>
          ))}
        </div>

        {/* Two Columns: Details & Sticky Reservation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Story, Highlights, Amenities, Suite Selection, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Story & Description */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/80 space-y-4">
              <h2 className="text-xl font-bold text-burgundy-950 uppercase tracking-wide">The Sanctuary Story</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
                {hotel.description}
              </p>

              {/* Highlights */}
              <div className="pt-4 border-t border-white/40">
                <h3 className="text-xs font-bold uppercase tracking-wider text-burgundy-950 mb-3">
                  Distinguished Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hotel.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 font-medium">
                      <div className="w-5 h-5 rounded-full bg-burgundy-950 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/80 space-y-4">
              <h2 className="text-xl font-bold text-burgundy-950 uppercase tracking-wide">Sanctuary Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 rounded-xl glass-pill flex items-center gap-2.5 text-xs font-bold text-stone-800"
                  >
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Selection & Suite Engine */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-burgundy-950 tracking-tight">Available Suites & Villas</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                  Choose your preferred accommodation tier. All suites feature personalized 24/7 butler service.
                </p>
              </div>

              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/80 hover:border-white transition-all flex flex-col sm:flex-row justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md glass-panel-dark text-white text-[10px] font-bold uppercase tracking-wider">
                          {room.capacity} Guests
                        </span>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="text-xs text-stone-600 font-semibold">{room.size}</span>
                      </div>

                      <h3 className="text-xl font-black text-burgundy-950">{room.name}</h3>
                      <div className="text-xs text-stone-700 font-medium">
                        Bed: <span className="font-bold text-stone-900">{room.bed}</span> · View: <span className="font-bold text-stone-900">{room.view}</span>
                      </div>

                      {/* Room Perks */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {room.features.map((feature, fIdx) => (
                          <span key={fIdx} className="px-2.5 py-0.5 rounded-md glass-pill text-burgundy-950 text-[10px] font-bold">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-emerald-800 font-bold pt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{room.cancellationPolicy}</span>
                      </div>
                    </div>

                    {/* Price and Select Button */}
                    <div className="flex sm:flex-col justify-between sm:justify-center items-end border-t sm:border-t-0 sm:border-l border-white/40 pt-4 sm:pt-0 sm:pl-6 sm:w-48 flex-shrink-0">
                      <div>
                        <div className="text-2xl font-black text-burgundy-950">
                          {formatCurrency(room.price)}
                        </div>
                        <div className="text-[10px] text-stone-600 font-medium">per night</div>
                        <div className="text-[10px] text-stone-500 mt-0.5 font-medium">
                          {formatCurrency(room.price * nights)} for {nights} {nights === 1 ? 'night' : 'nights'}
                        </div>
                      </div>

                      <button
                        onClick={() => openBookingModal(hotel, room)}
                        className="glass-button-burgundy px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide shadow-md mt-3 w-full text-center"
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Guest Reviews */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/40">
                <div>
                  <h2 className="text-xl font-bold text-burgundy-950 uppercase tracking-wide">Guest Appraisals</h2>
                  <div className="text-xs text-stone-600 mt-0.5 font-medium">Scored {hotel.rating} out of 5 based on 300+ stays</div>
                </div>
                <div className="px-3 py-1 rounded-md glass-panel-dark text-white font-black text-xs">
                  Score {hotel.rating} / 5.0
                </div>
              </div>

              <div className="space-y-4">
                {hotel.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl glass-pill space-y-2 border border-white/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-burgundy-900"
                        />
                        <div>
                          <div className="text-xs font-bold text-burgundy-950">{rev.author}</div>
                          <div className="text-[10px] text-stone-500 font-medium">{rev.date}</div>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded-md glass-button text-burgundy-950 font-black text-xs">
                        {rev.rating} / 5.0
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 italic leading-relaxed font-medium">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Reservation Widget */}
          <div className="lg:col-span-4 sticky top-20">
            <div className="glass-panel p-6 rounded-2xl border border-white/80 shadow-xl space-y-4">
              
              <div className="flex items-baseline justify-between border-b border-white/40 pb-3">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">Rates From</span>
                  <div className="text-3xl font-black text-burgundy-950">
                    {formatCurrency(hotel.basePrice)}
                    <span className="text-xs font-normal text-stone-600"> / night</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="glass-pill px-2.5 py-1 rounded-md text-burgundy-950 font-black text-xs">
                    Score {hotel.rating}
                  </div>
                </div>
              </div>

              {/* Schedule Preview */}
              <div className="p-3.5 rounded-xl glass-pill space-y-2 text-xs border border-white/60">
                <div className="flex justify-between text-stone-700">
                  <span className="font-semibold">Check-in:</span>
                  <span className="font-mono text-stone-900 font-bold">{searchParams.checkIn}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span className="font-semibold">Check-out:</span>
                  <span className="font-mono text-stone-900 font-bold">{searchParams.checkOut}</span>
                </div>
                <div className="flex justify-between text-stone-700 pt-1 border-t border-white/40">
                  <span className="font-semibold">Length of stay:</span>
                  <span className="font-bold text-burgundy-950">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                </div>
              </div>

              <div className="text-xs text-stone-700 font-medium space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Champagne welcome upon arrival</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Complimentary airport transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>No prepayment needed option</span>
                </div>
              </div>

              <button
                onClick={() => openBookingModal(hotel, hotel.rooms[0])}
                className="w-full glass-button-burgundy py-3.5 rounded-lg font-bold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Sanctuary Suite</span>
              </button>

              <p className="text-[10px] text-center text-stone-500 font-medium">
                You won't be charged yet. Review room selection on next step.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HotelDetailPage;
