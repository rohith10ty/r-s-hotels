const BOOKINGS_KEY = 'rs_hotels_bookings_v1';
const FAVORITES_KEY = 'rs_hotels_favorites_v1';

const INITIAL_MOCK_BOOKINGS = [
  {
    id: "RS-782419",
    createdAt: "2026-10-24T10:00:00Z",
    hotelId: "rs-amalfi",
    hotelName: "Villa Bellissima Coastline",
    hotelLocation: "Amalfi Coast, Italy",
    hotelImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    roomId: "room-amalfi-1",
    roomName: "Cliffside Azure Suite",
    checkIn: "2026-11-15",
    checkOut: "2026-11-19",
    nights: 4,
    guests: { adults: 2, children: 0, rooms: 1 },
    guestDetails: {
      fullName: "Eleanor Vance-Croft",
      email: "eleanor.vance@luxuryjourneys.com",
      phone: "+1 (555) 234-8901",
      specialRequests: "High floor cliffside view, extra feather pillows."
    },
    pricing: {
      roomRatePerNight: 980,
      baseTotal: 3920,
      addOnsTotal: 240,
      taxesAndFees: 490,
      discount: 0,
      grandTotal: 4650
    },
    addOns: [
      { id: "champagne", name: "Dom Pérignon Vintage Welcome & Caviar", price: 240 }
    ],
    status: "Confirmed", // Confirmed, Completed, Cancelled
    paymentMethod: "Credit Card (ending in 8842)"
  }
];

export const getStoredBookings = () => {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_MOCK_BOOKINGS));
      return INITIAL_MOCK_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read bookings from localStorage", err);
    return INITIAL_MOCK_BOOKINGS;
  }
};

export const saveNewBooking = (bookingData) => {
  try {
    const current = getStoredBookings();
    const updated = [bookingData, ...current];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save booking to localStorage", err);
    return [];
  }
};

export const cancelStoredBooking = (bookingId, cancellationReason = "Requested by guest") => {
  try {
    const current = getStoredBookings();
    const updated = current.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: "Cancelled",
          cancellationReason,
          cancelledAt: new Date().toISOString()
        };
      }
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to cancel booking", err);
    return [];
  }
};

export const getStoredFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ["rs-amalfi", "rs-paris"];
  } catch {
    return ["rs-amalfi", "rs-paris"];
  }
};

export const toggleStoredFavorite = (hotelId) => {
  try {
    const favs = getStoredFavorites();
    const updated = favs.includes(hotelId)
      ? favs.filter(id => id !== hotelId)
      : [...favs, hotelId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};
