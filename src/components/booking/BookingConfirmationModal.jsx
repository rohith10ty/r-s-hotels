import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CheckCircle2, MapPin, Download, ArrowRight, X, ShieldCheck } from 'lucide-react';

const BookingConfirmationModal = () => {
  const { 
    isConfirmationOpen, 
    setIsConfirmationOpen, 
    lastConfirmedBooking, 
    navigateTo, 
    openReceiptModal 
  } = useBooking();

  if (!isConfirmationOpen || !lastConfirmedBooking) return null;

  const handleGoToMyBookings = () => {
    setIsConfirmationOpen(false);
    navigateTo('my-bookings');
  };

  const handleViewVoucher = () => {
    setIsConfirmationOpen(false);
    openReceiptModal(lastConfirmedBooking);
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xl animate-in fade-in duration-200 no-scrollbar overflow-y-auto"
    >
      <div 
        data-lenis-prevent
        className="relative w-full max-w-lg modal-glass rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(30,3,10,0.50)] border-0 text-center my-auto no-scrollbar"
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsConfirmationOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-500 hover:text-stone-900 glass-pill transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-md mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg glass-pill text-burgundy-950 text-xs font-black mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Sanctuary Confirmed</span>
        </div>
        <h2 className="text-2xl font-black text-burgundy-950 tracking-tight">
          Reservation Secured
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-1 font-medium">
          A confirmation dispatch and digital key have been registered under your name.
        </p>

        {/* Booking Card Details */}
        <div className="modal-glass-inner p-4 rounded-2xl border-0 my-5 text-left space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200/50 pb-2">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Booking Reference</span>
            <span className="font-mono text-xs font-black text-burgundy-950 glass-pill px-3 py-1 rounded-lg">
              {lastConfirmedBooking.id}
            </span>
          </div>

          <div>
            <h4 className="font-black text-stone-900 text-sm">{lastConfirmedBooking.hotelName}</h4>
            <div className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-burgundy-700" />
              <span>{lastConfirmedBooking.hotelLocation}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-bold">Suite</span>
              <span className="font-bold text-stone-900">{lastConfirmedBooking.roomName}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-bold">Duration</span>
              <span className="font-bold text-stone-900">
                {lastConfirmedBooking.nights} Nights ({formatDate(lastConfirmedBooking.checkIn)} – {formatDate(lastConfirmedBooking.checkOut)})
              </span>
            </div>
          </div>

          <div className="flex justify-between items-baseline pt-2 border-t border-stone-200/50">
            <span className="text-xs text-stone-500 font-bold">Total Paid</span>
            <span className="text-xl font-black text-burgundy-950">
              {formatCurrency(lastConfirmedBooking.pricing.grandTotal)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleGoToMyBookings}
            className="w-full glass-button-burgundy py-3.5 rounded-xl text-xs font-black tracking-wide shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>View in My Bookings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={handleViewVoucher}
            className="w-full glass-button py-3 rounded-xl text-xs font-bold text-stone-800 hover:text-burgundy-950 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-burgundy-700" />
            <span>Download Reservation Voucher</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingConfirmationModal;
