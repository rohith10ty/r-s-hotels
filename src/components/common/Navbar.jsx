import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  Calendar, 
  Menu, 
  X, 
  ChevronRight 
} from 'lucide-react';

const Navbar = () => {
  const { currentView, navigateTo, bookings } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full glass-panel shadow-sm backdrop-blur-2xl">
      <div className="w-full h-14 sm:h-16 px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Left Side: Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-start">
          <button
            onClick={() => navigateTo('home')}
            className={`text-xs uppercase tracking-widest font-bold transition-colors ${
              currentView === 'home'
                ? 'text-burgundy-950 font-black'
                : 'text-stone-700 hover:text-burgundy-950'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('hotels')}
            className={`text-xs uppercase tracking-widest font-bold transition-colors ${
              currentView === 'hotels' || currentView === 'hotel-detail'
                ? 'text-burgundy-950 font-black'
                : 'text-stone-700 hover:text-burgundy-950'
            }`}
          >
            Sanctuaries
          </button>
          <button
            onClick={() => navigateTo('hotels')}
            className="text-xs uppercase tracking-widest font-bold text-stone-700 hover:text-burgundy-950 transition-colors"
          >
            Suites & Villas
          </button>
        </div>

        {/* Center: Brand Logo (Wordmark only, no 'R' box) */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center text-center group focus:outline-none"
          >
            <span className="text-lg sm:text-xl font-black tracking-[0.25em] text-burgundy-950 uppercase">
              R'S HOTELS
            </span>
          </button>
        </div>

        {/* Right Side: My Bookings & Explore */}
        <div className="hidden md:flex items-center gap-3.5 flex-1 justify-end">
          {/* My Bookings */}
          <button
            onClick={() => navigateTo('my-bookings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'my-bookings'
                ? 'bg-burgundy-950 text-white shadow-sm'
                : 'glass-button text-burgundy-950'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-burgundy-800" />
            <span>My Bookings</span>
            {activeBookingsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-burgundy-800 text-white text-[10px] rounded-full font-black">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Explore Direct CTA */}
          <button
            onClick={() => navigateTo('hotels')}
            className="glass-button-burgundy px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md"
          >
            <span>Explore Stays</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => navigateTo('my-bookings')}
            className="p-1.5 rounded-lg glass-button text-burgundy-950 relative"
            aria-label="My Bookings"
          >
            <Calendar className="w-4 h-4" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-burgundy-800 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg glass-button text-stone-900 focus:outline-none"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel p-4 space-y-2 animate-in fade-in">
          <button
            onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-bold flex items-center justify-between ${
              currentView === 'home' ? 'bg-white/80 text-burgundy-950 font-black' : 'text-stone-800'
            }`}
          >
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          </button>
          <button
            onClick={() => { navigateTo('hotels'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-bold flex items-center justify-between ${
              currentView === 'hotels' ? 'bg-white/80 text-burgundy-950 font-black' : 'text-stone-800'
            }`}
          >
            <span>Sanctuaries</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          </button>
          <button
            onClick={() => { navigateTo('my-bookings'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-bold flex items-center justify-between ${
              currentView === 'my-bookings' ? 'bg-white/80 text-burgundy-950 font-black' : 'text-stone-800'
            }`}
          >
            <span>My Bookings ({bookings.length})</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          </button>
          <div className="pt-2">
            <button
              onClick={() => { navigateTo('hotels'); setMobileMenuOpen(false); }}
              className="w-full glass-button-burgundy py-2 rounded-lg text-center font-bold text-xs"
            >
              Explore Stays
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
