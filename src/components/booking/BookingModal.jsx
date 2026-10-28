import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, calculateNights, generateBookingId, ADD_ON_SERVICES } from '../../utils/formatters';
import { 
  X, 
  Calendar, 
  MapPin, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Tag, 
  ChevronRight,
  Crown,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

const BookingModal = () => {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    bookingTarget, 
    searchParams, 
    handleBookingSuccess 
  } = useBooking();

  const hotel = bookingTarget?.hotel;
  const initialRoom = bookingTarget?.room || (hotel?.rooms && hotel.rooms[0]);

  // Form states
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoom?.id || '');
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || '2026-11-15');
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || '2026-11-19');
  const [guestsCount, setGuestsCount] = useState(searchParams.guests?.adults || 2);
  const [selectedAddOns, setSelectedAddOns] = useState(['champagne']);
  
  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Guest details form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8842');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialRoom) {
      setSelectedRoomId(initialRoom.id);
    }
  }, [initialRoom]);

  if (!isBookingModalOpen || !hotel) return null;

  const activeRoom = hotel.rooms.find(r => r.id === selectedRoomId) || hotel.rooms[0];
  const nights = calculateNights(checkIn, checkOut);

  // Dynamic calculations
  const roomTotal = activeRoom.price * nights;
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = ADD_ON_SERVICES.find(s => s.id === addOnId);
    return sum + (item ? item.price : 0);
  }, 0);
  const subtotal = roomTotal + addOnsTotal;
  const taxesAndFees = Math.round(subtotal * 0.10); // 10% luxury taxes
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const grandTotal = subtotal + taxesAndFees - discountAmount;

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'RHOTELS10') {
      setDiscountPercent(10);
      setPromoSuccess('10% VIP Curator Discount applied successfully!');
    } else if (code === 'WELCOME20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Grand Sanctuary Discount applied!');
    } else {
      setPromoError('Invalid promotion code. Try "RHOTELS10"');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Please enter guest full name';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address required';
    if (!phone.trim()) errors.phone = 'Contact number is required for dispatch';
    return errors;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    // Realistic delay for booking confirmation
    setTimeout(() => {
      const newBooking = {
        id: generateBookingId('RS'),
        createdAt: new Date().toISOString(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        hotelImage: hotel.images[0],
        roomId: activeRoom.id,
        roomName: activeRoom.name,
        checkIn,
        checkOut,
        nights,
        guests: {
          adults: guestsCount,
          children: searchParams.guests?.children || 0,
          rooms: 1
        },
        guestDetails: {
          fullName,
          email,
          phone,
          specialRequests
        },
        pricing: {
          roomRatePerNight: activeRoom.price,
          baseTotal: roomTotal,
          addOnsTotal,
          taxesAndFees,
          discount: discountAmount,
          grandTotal
        },
        addOns: selectedAddOns.map(id => {
          const item = ADD_ON_SERVICES.find(s => s.id === id);
          return { id, name: item?.name, price: item?.price };
        }),
        status: 'Confirmed',
        paymentMethod: paymentMethod === 'card' ? `Credit Card (${cardNumber.slice(-4)})` : 'Sanctuary Direct Pay'
      };

      // Confetti celebration effect!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#751336', '#FAF2F4', '#F3D5DE', '#E0A96D']
        });
      } catch (err) {
        // ignore if confetti fails
      }

      setIsSubmitting(false);
      handleBookingSuccess(newBooking);
    }, 900);
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto no-scrollbar bg-stone-950/80 backdrop-blur-2xl animate-in fade-in duration-200"
    >
      
      {/* Frosted Glass Sanctuary Modal Card - Zero Borders */}
      <div 
        data-lenis-prevent
        className="relative w-full max-w-4xl modal-glass booking-modal-shell rounded-3xl shadow-[0_30px_90px_rgba(30,3,10,0.50)] border-0 overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 flex items-center justify-between bg-burgundy-950/95 backdrop-blur-md text-white border-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-burgundy-800 flex items-center justify-center text-rose-200 shadow-inner">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">Reserve Sanctuary Suite</h2>
              <p className="text-xs text-rose-200/80 font-medium">{hotel.name} · {hotel.location}</p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 rounded-xl bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Two column grid with NO scrollbar */}
        <form 
          data-lenis-prevent
          onSubmit={handleSubmitBooking} 
          className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8"
        >
          
          {/* Left Column: Dates, Room choice, Add-ons, Guest Info */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Stay Dates & Guests selector: Frosted Blurred Card */}
            <div className="p-4 rounded-2xl modal-glass-inner space-y-3 shadow-sm border-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-burgundy-950 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-burgundy-700" />
                  Reservation Schedule
                </span>
                <span className="text-xs font-black text-burgundy-950 glass-pill px-3 py-1 rounded-lg">
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-stone-600 font-bold block mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full glass-pill rounded-xl px-3 py-2.5 font-bold text-stone-900 focus:outline-none border-0 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-stone-600 font-bold block mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full glass-pill rounded-xl px-3 py-2.5 font-bold text-stone-900 focus:outline-none border-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Room Tier Selection: Frosted Cards */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-burgundy-950 mb-2.5">
                Select Suite Tier
              </label>
              <div className="space-y-2.5">
                {hotel.rooms.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-3.5 rounded-2xl border-0 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-burgundy-900/15 ring-2 ring-burgundy-800 shadow-md backdrop-blur-md'
                          : 'modal-glass-inner hover:bg-white/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border-0 flex items-center justify-center ${
                            isSelected ? 'bg-burgundy-900 text-white' : 'glass-pill'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span className="text-sm font-extrabold text-stone-900">{room.name}</span>
                        </div>
                        <div className="text-[11px] text-stone-600 ml-6 mt-0.5 font-medium">
                          {room.size} · {room.view} · Max {room.capacity} guests
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-burgundy-950">
                          {formatCurrency(room.price)}
                        </span>
                        <span className="text-[10px] text-stone-500 block font-medium">/ night</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Luxury Add-on Services: Frosted Cards */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-burgundy-950 mb-2.5">
                Curated Add-on Rituals
              </label>
              <div className="space-y-2">
                {ADD_ON_SERVICES.map((addOn) => {
                  const isChecked = selectedAddOns.includes(addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`p-3 rounded-xl border-0 text-xs cursor-pointer transition-all flex items-start justify-between ${
                        isChecked
                          ? 'bg-burgundy-900/15 ring-1.5 ring-burgundy-800 shadow-sm'
                          : 'modal-glass-inner hover:bg-white/60'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 w-4 h-4 rounded-md border-0 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-burgundy-900 text-white' : 'glass-pill'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900">{addOn.name}</div>
                          <div className="text-[11px] text-stone-600 mt-0.5">{addOn.description}</div>
                        </div>
                      </div>
                      <span className="font-extrabold text-burgundy-950 ml-2 whitespace-nowrap">
                        +{formatCurrency(addOn.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Information: Frosted Inputs */}
            <div className="pt-2 border-t border-stone-300/40 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-burgundy-950">
                Primary Guest Information
              </h3>
              
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Lord Julian Sterling"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl glass-pill text-sm font-bold focus:outline-none border-0 ${
                    formErrors.fullName ? 'ring-2 ring-rose-500 bg-rose-50/50' : 'focus:ring-2 focus:ring-burgundy-800'
                  }`}
                />
                {formErrors.fullName && <p className="text-[11px] text-rose-600 mt-0.5 font-bold">{formErrors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="julian@sterling.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl glass-pill text-sm font-bold focus:outline-none border-0 ${
                      formErrors.email ? 'ring-2 ring-rose-500 bg-rose-50/50' : 'focus:ring-2 focus:ring-burgundy-800'
                    }`}
                  />
                  {formErrors.email && <p className="text-[11px] text-rose-600 mt-0.5 font-bold">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl glass-pill text-sm font-bold focus:outline-none border-0 ${
                      formErrors.phone ? 'ring-2 ring-rose-500 bg-rose-50/50' : 'focus:ring-2 focus:ring-burgundy-800'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[11px] text-rose-600 mt-0.5 font-bold">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Special Requests / Dietary Requirements (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Feather pillows, early check-in, champagne chilled at 16:00"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-pill text-xs font-medium focus:outline-none focus:ring-2 focus:ring-burgundy-800 border-0"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Pricing Summary & Payment */}
          <div className="md:col-span-5 space-y-5">
            
            {/* Hotel Mini Preview Card: Frosted */}
            <div className="modal-glass-inner p-4 rounded-2xl border-0 flex items-center gap-3 shadow-sm">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-16 h-16 rounded-xl object-cover shadow-sm"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-black text-burgundy-950 truncate">{hotel.name}</div>
                <div className="text-[11px] text-stone-600 flex items-center gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3 h-3 flex-shrink-0 text-burgundy-700" />
                  <span className="truncate">{hotel.location}</span>
                </div>
                <div className="text-[11px] font-bold text-stone-800 mt-1">
                  {activeRoom.name}
                </div>
              </div>
            </div>

            {/* Price Breakdown Card: Frosted */}
            <div className="modal-glass-inner p-5 rounded-2xl border-0 space-y-3.5 shadow-md">
              <h4 className="text-xs font-black uppercase tracking-wider text-burgundy-950 pb-2 border-b border-stone-300/40">
                Investment Summary
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span className="font-medium">{formatCurrency(activeRoom.price)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span className="font-extrabold text-stone-900">{formatCurrency(roomTotal)}</span>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span className="font-medium">Curated Add-ons ({selectedAddOns.length})</span>
                    <span className="font-extrabold text-stone-900">{formatCurrency(addOnsTotal)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span className="font-medium">Luxury Tourism Taxes (10%)</span>
                  <span className="font-extrabold text-stone-900">{formatCurrency(taxesAndFees)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-bold">
                    <span>VIP Promotion ({discountPercent}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
              </div>

              {/* Promo code input */}
              <div className="pt-3 border-t border-stone-300/40">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo: RHOTELS10"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 rounded-xl glass-pill text-xs font-bold focus:outline-none uppercase border-0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl glass-button-burgundy text-white text-xs font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-600 mt-1 font-bold">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-700 mt-1 font-bold">{promoSuccess}</p>}
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-stone-300/50 flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">Total Amount</div>
                  <div className="text-[10px] text-stone-500 font-medium">All taxes & concierge services included</div>
                </div>
                <div className="text-2xl font-black text-burgundy-950">
                  {formatCurrency(grandTotal)}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="modal-glass-inner p-4 rounded-2xl border-0 space-y-3 shadow-sm">
              <label className="block text-xs font-black uppercase tracking-wider text-burgundy-950">
                Payment Guarantee
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 rounded-xl border-0 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'glass-button-burgundy text-white shadow-md'
                      : 'modal-glass-inner text-stone-800 hover:bg-white/70'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('hotel')}
                  className={`py-2.5 px-3 rounded-xl border-0 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'hotel'
                      ? 'glass-button-burgundy text-white shadow-md'
                      : 'modal-glass-inner text-stone-800 hover:bg-white/70'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pay at Hotel</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="pt-2 animate-in fade-in">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-pill font-mono text-xs font-bold border-0 focus:outline-none"
                    placeholder="Card Number"
                  />
                  <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    <span>256-Bit Encrypted Concierge Transaction</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Reservation Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full glass-button-burgundy py-4 px-6 rounded-2xl font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 hover:shadow-2xl transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-rose-200" />
              <span>{isSubmitting ? 'Confirming Sanctuary...' : 'Confirm Sanctuary Reservation'}</span>
            </button>

            <p className="text-[10px] text-stone-500 text-center font-medium">
              Free cancellation up to 48 hours prior to check-in time.
            </p>

          </div>

        </form>

      </div>
    </div>
  );
};

export default BookingModal;
