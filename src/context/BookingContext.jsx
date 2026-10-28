import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredBookings, saveNewBooking, cancelStoredBooking, getStoredFavorites, toggleStoredFavorite } from '../utils/storage';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  // Global search parameters
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '2026-11-15',
    checkOut: '2026-11-19',
    guests: {
      adults: 2,
      children: 0,
      rooms: 1,
    }
  });

  const getInitialView = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'hotels', 'hotel-detail', 'my-bookings'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  };

  // Navigation state (supports direct hash routing e.g. #hotels, #my-bookings)
  const [currentView, setCurrentView] = useState(getInitialView);
  const [selectedHotelId, setSelectedHotelId] = useState('rs-paris');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'hotels', 'hotel-detail', 'my-bookings'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Bookings list
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTarget, setBookingTarget] = useState({ hotel: null, room: null });
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [receiptTarget, setReceiptTarget] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setBookings(getStoredBookings());
    setFavorites(getStoredFavorites());

    // Direct booking link support e.g. ?book=rs-paris
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const bookId = params.get('book');
      if (bookId) {
        import('../data/hotelsData').then(({ HOTELS_DATA }) => {
          const hotel = HOTELS_DATA.find(h => h.id === bookId);
          if (hotel) {
            openBookingModal(hotel);
          }
        });
      }
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const handleToggleFavorite = (hotelId) => {
    const updated = toggleStoredFavorite(hotelId);
    setFavorites(updated);
    if (updated.includes(hotelId)) {
      showToast('Sanctuary added to your personal curated wishlist.');
    } else {
      showToast('Sanctuary removed from wishlist.');
    }
  };

  const navigateTo = (view, hotelId = null) => {
    if (hotelId) {
      setSelectedHotelId(hotelId);
    }
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (hotel, room = null) => {
    const selectedRoom = room || (hotel?.rooms && hotel.rooms[0]) || null;
    setBookingTarget({ hotel, room: selectedRoom });
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingTarget({ hotel: null, room: null });
  };

  const handleBookingSuccess = (newBooking) => {
    const updatedList = saveNewBooking(newBooking);
    setBookings(updatedList);
    setIsBookingModalOpen(false);
    setLastConfirmedBooking(newBooking);
    setIsConfirmationOpen(true);
    showToast(`Reservation ${newBooking.id} confirmed at ${newBooking.hotelName}!`);
  };

  const handleCancelBooking = (bookingId, reason) => {
    const updated = cancelStoredBooking(bookingId, reason);
    setBookings(updated);
    setIsCancelOpen(false);
    setCancelTarget(null);
    showToast('Reservation successfully cancelled.', 'info');
  };

  const openReceiptModal = (booking) => {
    setReceiptTarget(booking);
    setIsReceiptOpen(true);
  };

  const openCancelModal = (booking) => {
    setCancelTarget(booking);
    setIsCancelOpen(true);
  };

  return (
    <BookingContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedHotelId,
        setSelectedHotelId,
        searchParams,
        setSearchParams,
        bookings,
        favorites,
        toggleFavorite: handleToggleFavorite,
        isBookingModalOpen,
        bookingTarget,
        openBookingModal,
        closeBookingModal,
        handleBookingSuccess,
        lastConfirmedBooking,
        isConfirmationOpen,
        setIsConfirmationOpen,
        receiptTarget,
        isReceiptOpen,
        openReceiptModal,
        setIsReceiptOpen,
        cancelTarget,
        isCancelOpen,
        openCancelModal,
        setIsCancelOpen,
        handleCancelBooking,
        toast,
        showToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
