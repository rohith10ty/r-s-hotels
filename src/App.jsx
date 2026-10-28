import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BookingProvider, useBooking } from './context/BookingContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import HotelsListPage from './pages/HotelsListPage';
import HotelDetailPage from './pages/HotelDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingModal from './components/booking/BookingModal';
import BookingConfirmationModal from './components/booking/BookingConfirmationModal';
import VoucherReceiptModal from './components/booking/VoucherReceiptModal';
import CancelBookingModal from './components/booking/CancelBookingModal';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const MainAppContent = () => {
  const { 
    currentView, 
    toast, 
    isBookingModalOpen, 
    isConfirmationOpen, 
    isReceiptOpen, 
    isCancelOpen 
  } = useBooking();

  const lenisRef = useRef(null);
  const isAnyModalOpen = isBookingModalOpen || isConfirmationOpen || isReceiptOpen || isCancelOpen;

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis and prevent body scroll when any modal is open
  useEffect(() => {
    if (lenisRef.current) {
      if (isAnyModalOpen) {
        lenisRef.current.stop();
        document.documentElement.classList.add('lenis-stopped');
        document.body.style.overflow = 'hidden';
      } else {
        lenisRef.current.start();
        document.documentElement.classList.remove('lenis-stopped');
        document.body.style.overflow = '';
      }
    }
  }, [isAnyModalOpen]);

  return (
    <div className="min-h-screen text-stone-900 flex flex-col justify-between selection:bg-burgundy-900 selection:text-white bg-transparent">
      
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-300">
          <div className="glass-panel-burgundy text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 text-xs sm:text-sm font-semibold max-w-md">
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-amber-300 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Full-Width Rectangle Navbar */}
      <Navbar />

      {/* Primary Page Content */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'hotels' && <HotelsListPage />}
        {currentView === 'hotel-detail' && <HotelDetailPage />}
        {currentView === 'my-bookings' && <MyBookingsPage />}
      </main>

      {/* Global Modals */}
      <BookingModal />
      <BookingConfirmationModal />
      <VoucherReceiptModal />
      <CancelBookingModal />

      {/* Luxury Global Footer */}
      <Footer />

    </div>
  );
};

const App = () => {
  return (
    <BookingProvider>
      <MainAppContent />
    </BookingProvider>
  );
};

export default App;
