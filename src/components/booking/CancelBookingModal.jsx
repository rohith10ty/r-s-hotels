import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

const CancelBookingModal = () => {
  const { isCancelOpen, setIsCancelOpen, cancelTarget, handleCancelBooking } = useBooking();
  const [reason, setReason] = useState('Change of travel itineraries');
  const [notes, setNotes] = useState('');

  if (!isCancelOpen || !cancelTarget) return null;

  const onConfirm = () => {
    const finalReason = notes.trim() ? `${reason} — ${notes.trim()}` : reason;
    handleCancelBooking(cancelTarget.id, finalReason);
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xl animate-in fade-in duration-200 no-scrollbar overflow-y-auto"
    >
      <div 
        data-lenis-prevent
        className="relative w-full max-w-md modal-glass rounded-3xl p-6 sm:p-7 shadow-[0_25px_80px_rgba(30,3,10,0.50)] border-0 text-center my-auto no-scrollbar"
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsCancelOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-500 hover:text-stone-900 glass-pill transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 mx-auto flex items-center justify-center shadow-md mb-3">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-black text-burgundy-950 tracking-tight">Cancel Reservation?</h3>
        <p className="text-xs text-stone-600 mt-1 font-medium">
          Are you sure you wish to cancel your stay at <span className="font-bold text-burgundy-950">{cancelTarget.hotelName}</span>?
        </p>

        {/* Cancellation Details: Frosted */}
        <div className="my-4 p-4 rounded-2xl modal-glass-inner border-0 text-left text-xs space-y-2 shadow-sm">
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Booking ID:</span>
            <span className="font-mono font-bold text-stone-900">{cancelTarget.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Suite:</span>
            <span className="font-bold text-stone-900">{cancelTarget.roomName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Refund Status:</span>
            <span className="font-extrabold text-emerald-800">100% Eligible (Free Cancellation)</span>
          </div>
        </div>

        {/* Reason Selector */}
        <div className="text-left mb-5 space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-burgundy-950">Reason for Cancellation</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full text-xs p-3 rounded-xl glass-pill font-bold text-stone-900 border-0 focus:outline-none"
          >
            <option value="Change of travel itineraries">Change of travel itineraries</option>
            <option value="Found alternative accommodation">Found alternative accommodation</option>
            <option value="Personal / Family emergency">Personal / Family emergency</option>
            <option value="Flight / Transportation delay">Flight / Transportation delay</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes for the concierge (optional)..."
            className="w-full text-xs p-3 rounded-xl glass-pill font-medium text-stone-900 border-0 focus:outline-none mt-1"
          />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsCancelOpen(false)}
            className="py-3 rounded-xl glass-button font-bold text-xs text-stone-800 hover:text-burgundy-950 transition-all cursor-pointer shadow-sm"
          >
            Keep Reservation
          </button>
          <button
            onClick={onConfirm}
            className="py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black text-xs transition-all shadow-md cursor-pointer"
          >
            Confirm Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default CancelBookingModal;
