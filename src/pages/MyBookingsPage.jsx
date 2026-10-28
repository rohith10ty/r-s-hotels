import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  Calendar, 
  MapPin, 
  XCircle, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';

const MyBookingsPage = () => {
  const { 
    bookings, 
    navigateTo, 
    openReceiptModal, 
    openCancelModal 
  } = useBooking();

  const [activeTab, setActiveTab] = useState('all');

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'confirmed') return b.status === 'Confirmed';
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    return true;
  });

  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  return (
    <div className="pt-20 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md glass-pill text-burgundy-950 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5 text-burgundy-800" />
              <span>Personal Itineraries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-burgundy-950 tracking-tight">
              My Sanctuary Reservations
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
              Review and manage your confirmed stays, download official vouchers, or modify bookings.
            </p>
          </div>

          <button
            onClick={() => navigateTo('hotels')}
            className="glass-button-burgundy px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide shadow-md flex items-center gap-2 self-start md:self-auto"
          >
            <span>Book Another Sanctuary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-burgundy-950 text-white shadow-sm'
                : 'glass-button text-stone-700'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'confirmed'
                ? 'bg-burgundy-950 text-white shadow-sm'
                : 'glass-button text-stone-700'
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'cancelled'
                ? 'bg-burgundy-950 text-white shadow-sm'
                : 'glass-button text-stone-700'
            }`}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>

        {/* Bookings List or Empty State */}
        {filteredBookings.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center space-y-4 my-8">
            <div className="w-14 h-14 rounded-full bg-burgundy-100 text-burgundy-950 mx-auto flex items-center justify-center">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-burgundy-950">No reservations found in this view</h3>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto font-medium">
              You do not have any {activeTab !== 'all' ? activeTab : ''} bookings at this moment. Ready to plan your next transcendent escape?
            </p>
            <button
              onClick={() => navigateTo('hotels')}
              className="glass-button-burgundy px-6 py-2.5 rounded-lg text-xs font-bold shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Sanctuaries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const isConfirmed = booking.status === 'Confirmed';
              const isCancelled = booking.status === 'Cancelled';

              return (
                <div
                  key={booking.id}
                  className="glass-panel rounded-2xl p-6 shadow-md flex flex-col md:flex-row gap-6 transition-all duration-300"
                >
                  {/* Hotel Thumbnail */}
                  <div className="relative md:w-64 h-52 md:h-auto rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img
                      src={booking.hotelImage}
                      alt={booking.hotelName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-bold shadow-md flex items-center gap-1.5 ${
                        isConfirmed 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-rose-700 text-white'
                      }`}>
                        {isConfirmed ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Confirmed</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3" />
                            <span>Cancelled</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Bar with Booking ID */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-stone-200/40">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-stone-500">Reservation ID</span>
                          <span className="font-mono text-xs font-black text-burgundy-950 glass-pill px-2 py-0.5 rounded-md">
                            {booking.id}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-medium">
                          Booked on {formatDate(booking.createdAt)}
                        </span>
                      </div>

                      {/* Hotel Name & Location */}
                      <h3 className="text-xl font-black text-burgundy-950">{booking.hotelName}</h3>
                      <div className="text-xs text-stone-600 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-burgundy-700" />
                        <span>{booking.hotelLocation}</span>
                      </div>

                      {/* Suite specs & dates */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3.5 p-3 rounded-xl glass-pill text-xs">
                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase font-bold">Suite</span>
                          <span className="font-bold text-stone-800">{booking.roomName}</span>
                          <span className="text-stone-600 block text-[11px] font-medium">
                            {booking.guests?.adults || 2} Adults · {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase font-bold">Dates</span>
                          <span className="font-bold text-stone-800">
                            {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
                          </span>
                          <span className="text-stone-600 block text-[11px] font-medium">
                            VIP Check-in: 14:00
                          </span>
                        </div>
                      </div>

                      {/* Add-ons list if any */}
                      {booking.addOns && booking.addOns.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {booking.addOns.map((addon) => (
                            <span key={addon.id} className="px-2.5 py-0.5 rounded-md glass-pill text-burgundy-950 text-[10px] font-bold">
                              + {addon.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Cancelled notes if any */}
                      {isCancelled && booking.cancellationReason && (
                        <div className="mt-3 p-2 rounded-lg bg-rose-50 text-xs text-rose-800 font-medium">
                          <span className="font-bold">Cancellation note:</span> {booking.cancellationReason}
                        </div>
                      )}
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-stone-200/40">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                          Total Amount Paid
                        </span>
                        <span className="text-xl font-black text-burgundy-950">
                          {formatCurrency(booking.pricing.grandTotal)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* View Voucher / Receipt */}
                        <button
                          onClick={() => openReceiptModal(booking)}
                          className="px-4 py-2 rounded-lg glass-button text-xs font-bold text-burgundy-950 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-burgundy-700" />
                          <span>View Voucher / Receipt</span>
                        </button>

                        {/* View Sanctuary page */}
                        <button
                          onClick={() => navigateTo('hotel-detail', booking.hotelId)}
                          className="px-3 py-2 rounded-lg text-xs font-bold text-stone-700 hover:text-burgundy-950"
                        >
                          View Hotel
                        </button>

                        {/* Cancel Reservation */}
                        {isConfirmed && (
                          <button
                            onClick={() => openCancelModal(booking)}
                            className="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel Stay</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookingsPage;
