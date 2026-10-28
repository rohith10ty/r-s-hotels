import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Printer, Download, X, QrCode, ShieldCheck, MapPin, Calendar, User, Crown } from 'lucide-react';

const VoucherReceiptModal = () => {
  const { isReceiptOpen, setIsReceiptOpen, receiptTarget } = useBooking();

  if (!isReceiptOpen || !receiptTarget) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto no-scrollbar"
    >
      <div 
        data-lenis-prevent
        className="relative w-full max-w-2xl modal-glass rounded-3xl shadow-[0_25px_80px_rgba(30,3,10,0.50)] border-0 p-6 sm:p-8 my-auto max-h-[92vh] overflow-y-auto no-scrollbar"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/50">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-burgundy-800" />
            <span className="font-black text-burgundy-950 text-base">R's Hotels Official Receipt & Voucher</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl glass-button text-stone-700 hover:text-burgundy-950 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Print Voucher"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => setIsReceiptOpen(false)}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 glass-pill transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Document */}
        <div className="py-5 space-y-5 text-stone-800 print:m-0" id="printable-voucher">
          
          {/* Header of Voucher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-burgundy-950 text-white shadow-md">
            <div>
              <div className="text-xl font-black tracking-tight flex items-center gap-2">
                <span>R's Hotels</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-burgundy-800 text-rose-200 font-bold uppercase tracking-wider">
                  Curated Sanctuaries
                </span>
              </div>
              <p className="text-xs text-rose-200/80 mt-1 font-medium">
                Global Concierge & VIP Guest Reservation Confirmation
              </p>
            </div>
            <div className="sm:text-right">
              <div className="text-[10px] uppercase font-bold text-rose-300">Booking ID</div>
              <div className="font-mono text-lg font-black tracking-wider text-white">{receiptTarget.id}</div>
              <div className="text-[10px] text-rose-200/70 mt-0.5 font-medium">Status: {receiptTarget.status}</div>
            </div>
          </div>

          {/* Hotel & Stay Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl modal-glass-inner border-0 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">Sanctuary</span>
              <h3 className="font-black text-burgundy-950 text-base">{receiptTarget.hotelName}</h3>
              <p className="text-xs text-stone-600 flex items-center gap-1 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-burgundy-700 flex-shrink-0" />
                <span>{receiptTarget.hotelLocation}</span>
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">Suite Reserved</span>
              <div className="font-bold text-stone-900 text-sm">{receiptTarget.roomName}</div>
              <p className="text-xs text-stone-600 mt-1 font-medium">
                {receiptTarget.guests?.adults || 2} Adults · {receiptTarget.nights} Nights
              </p>
            </div>
          </div>

          {/* Schedule & Guest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 modal-glass-inner p-3.5 rounded-2xl border-0">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Check-in / Check-out</span>
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-burgundy-700" />
                <span>{formatDate(receiptTarget.checkIn)} — {formatDate(receiptTarget.checkOut)}</span>
              </div>
              <div className="text-stone-500 text-[11px]">VIP Check-in: 14:00 | Check-out: 12:00</div>
            </div>
            <div className="space-y-1 modal-glass-inner p-3.5 rounded-2xl border-0">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Primary Guest</span>
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-burgundy-700" />
                <span>{receiptTarget.guestDetails?.fullName || "Valued Guest"}</span>
              </div>
              <div className="text-stone-500 text-[11px]">{receiptTarget.guestDetails?.email || "concierge@rshotels.com"}</div>
            </div>
          </div>

          {/* Itemized Price Breakdown */}
          <div className="modal-glass-inner p-4 rounded-2xl border-0 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-burgundy-950 pb-1.5 border-b border-stone-200/50">
              Itemized Statement
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200/30">
                <span className="text-stone-600">
                  {receiptTarget.roomName} ({receiptTarget.nights} nights @ {formatCurrency(receiptTarget.pricing?.roomRatePerNight || 0)}/night)
                </span>
                <span className="font-bold text-stone-900">
                  {formatCurrency(receiptTarget.pricing?.baseTotal || 0)}
                </span>
              </div>

              {receiptTarget.addOns && receiptTarget.addOns.map((addon) => (
                <div key={addon.id} className="flex justify-between py-1 border-b border-stone-200/30 text-stone-600">
                  <span>Add-on: {addon.name}</span>
                  <span className="font-bold text-stone-900">{formatCurrency(addon.price)}</span>
                </div>
              ))}

              <div className="flex justify-between py-1 border-b border-stone-200/30 text-stone-600">
                <span>Luxury Taxes & Tourism Assessment</span>
                <span className="font-bold text-stone-900">
                  {formatCurrency(receiptTarget.pricing?.taxesAndFees || 0)}
                </span>
              </div>

              {receiptTarget.pricing?.discount > 0 && (
                <div className="flex justify-between py-1 border-b border-stone-200/30 text-emerald-800 font-bold">
                  <span>VIP Promotional Courtesy</span>
                  <span>-{formatCurrency(receiptTarget.pricing.discount)}</span>
                </div>
              )}

              <div className="flex justify-between py-2 text-sm font-black text-burgundy-950 pt-2">
                <span>Grand Total Paid</span>
                <span className="text-lg">{formatCurrency(receiptTarget.pricing?.grandTotal || 0)}</span>
              </div>
            </div>
          </div>

          {/* Digital QR Code & Verification footer */}
          <div className="p-4 rounded-2xl modal-glass-inner border-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/80 p-1.5 rounded-xl shadow-sm flex items-center justify-center">
                <QrCode className="w-10 h-10 text-stone-900" />
              </div>
              <div>
                <div className="text-xs font-black text-stone-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Concierge Key</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5 font-medium">
                  Present this QR or booking reference at sanctuary reception upon arrival.
                </div>
              </div>
            </div>
            <div className="text-right text-[11px] text-stone-500 font-medium">
              R's Hotels Global Group<br />Place Vendôme, Paris
            </div>
          </div>

        </div>

        {/* Bottom Done Button */}
        <div className="pt-3 border-t border-stone-200/50">
          <button
            onClick={() => setIsReceiptOpen(false)}
            className="w-full glass-button-burgundy py-3.5 rounded-xl font-bold text-xs tracking-wide cursor-pointer shadow-md"
          >
            Close Voucher
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoucherReceiptModal;
