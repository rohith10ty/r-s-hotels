import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  MapPin, Minus, Plus, Users
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { calculateNights } from '../../utils/formatters';

const DESTINATIONS = [
  { city: 'Paris', country: 'France' },
  { city: 'Amalfi Coast', country: 'Italy' },
  { city: 'Kyoto', country: 'Japan' },
  { city: 'Aspen', country: 'United States' },
  { city: 'Santorini', country: 'Greece' },
  { city: 'Maldives', country: 'Maldives' },
];

const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const dateValue = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0')
].join('-');

const addDays = (value, days) => {
  const date = parseDate(value);
  date.setDate(date.getDate() + days);
  return dateValue(date);
};

const displayDate = (value) => parseDate(value)?.toLocaleDateString('en-US', {
  month: 'short', day: 'numeric'
}) || '';

const SearchConsole = ({ onSearchComplete, placement = 'below' }) => {
  const { searchParams, setSearchParams, navigateTo } = useBooking();
  const [destinationInput, setDestinationInput] = useState(searchParams.destination || '');
  const [checkInDate, setCheckInDate] = useState(searchParams.checkIn || '');
  const [checkOutDate, setCheckOutDate] = useState(searchParams.checkOut || '');
  const [guests, setGuests] = useState(searchParams.guests || { adults: 2, children: 0, rooms: 1 });
  const [openPanel, setOpenPanel] = useState(null);
  const [panelPlacement, setPanelPlacement] = useState(placement);
  const [dateStep, setDateStep] = useState('checkIn');
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const date = parseDate(searchParams.checkIn) || new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const formRef = useRef(null);
  const today = dateValue(new Date());

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) setOpenPanel(null);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpenPanel(null);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const suggestions = DESTINATIONS.filter(({ city, country }) =>
    (city + ' ' + country).toLowerCase().includes(destinationInput.toLowerCase())
  );
  const popoverPosition = panelPlacement === 'above' ? 'bottom-full mb-3' : 'top-full mt-3';
  const nights = calculateNights(checkInDate, checkOutDate);

  const showPanel = (panel) => {
    const spaceAbove = formRef.current?.getBoundingClientRect().top || 0;
    const neededSpace = panel === 'dates' ? 440 : panel === 'destination' ? 330 : 320;
    setPanelPlacement(placement === 'above' && spaceAbove >= neededSpace ? 'above' : 'below');
    setOpenPanel(panel);
  };

  const selectDestination = (destination) => {
    setDestinationInput(destination);
    setSearchParams((previous) => ({ ...previous, destination }));
    setOpenPanel(null);
  };

  const updateGuests = (field, change) => {
    setGuests((previous) => ({
      ...previous,
      [field]: Math.max(field === 'children' ? 0 : 1, previous[field] + change)
    }));
  };

  const openDates = () => {
    if (openPanel === 'dates') {
      setOpenPanel(null);
      return;
    }
    const date = parseDate(checkInDate) || new Date();
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setDateStep('checkIn');
    showPanel('dates');
  };

  const selectDate = (value) => {
    if (dateStep === 'checkIn') {
      const nextCheckOut = checkOutDate > value ? checkOutDate : addDays(value, 1);
      setCheckInDate(value);
      setCheckOutDate(nextCheckOut);
      setSearchParams((previous) => ({ ...previous, checkIn: value, checkOut: nextCheckOut }));
      setDateStep('checkOut');
    } else if (value > checkInDate) {
      setCheckOutDate(value);
      setSearchParams((previous) => ({ ...previous, checkOut: value }));
      setOpenPanel(null);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams((previous) => ({
      ...previous,
      destination: destinationInput.trim(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests
    }));
    setOpenPanel(null);
    if (onSearchComplete) onSearchComplete();
    else navigateTo('hotels');
  };

  const firstWeekday = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];

  return (
    <form
      ref={formRef}
      onSubmit={handleSearch}
      className="booking-console relative z-30 grid w-full grid-cols-1 gap-2.5 rounded-2xl border border-white/20 p-2.5 shadow-2xl md:grid-cols-12 md:items-stretch"
    >
      <div className="relative md:col-span-4">
        <div className="flex h-full min-h-[76px] items-center gap-4 rounded-xl border border-white/15 bg-white/10 px-4 text-white transition-colors focus-within:bg-white/15">
          <MapPin className="h-6 w-6 shrink-0" strokeWidth={1.6} />
          <div className="min-w-0 flex-1">
            <label htmlFor="stay-destination" className="block font-serif text-base">Destination</label>
            <input
              id="stay-destination"
              type="text"
              autoComplete="off"
              value={destinationInput}
              onChange={(event) => {
                setDestinationInput(event.target.value);
                showPanel('destination');
              }}
              onFocus={() => showPanel('destination')}
              placeholder="Where would you like to go?"
              aria-expanded={openPanel === 'destination'}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/65"
            />
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-amber-300" />
        </div>
        {openPanel === 'destination' && (
          <div data-lenis-prevent className={'booking-popover absolute left-0 z-[100] w-[min(24rem,calc(100vw-2.5rem))] rounded-2xl p-3 ' + popoverPosition}>
            <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-burgundy-950">Destinations</p>
            <div className="max-h-80 overflow-y-auto">
              <button type="button" onClick={() => selectDestination('')} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-burgundy-950 hover:bg-white/60">
                All sanctuaries
              </button>
              {suggestions.map(({ city, country }) => (
                <button key={city} type="button" onClick={() => selectDestination(city)} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-white/60">
                  <span className="text-sm font-semibold text-burgundy-950">{city}</span>
                  <span className="text-xs text-stone-600">{country}</span>
                </button>
              ))}
              {suggestions.length === 0 && (
                <p className="px-3 py-2 text-sm text-stone-600">Press Find Your Stay to search for this destination.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative md:col-span-4">
        <button
          type="button"
          onClick={openDates}
          aria-expanded={openPanel === 'dates'}
          aria-label="Select check-in and check-out dates"
          className="flex h-full min-h-[76px] w-full items-center gap-4 rounded-xl border border-white/15 bg-white/10 px-4 text-left text-white transition-colors hover:bg-white/15"
        >
          <CalendarDays className="h-6 w-6 shrink-0" strokeWidth={1.6} />
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-base">Check-in — Check-out</span>
            <span className="block truncate text-sm text-white/70">
              {checkInDate && checkOutDate ? displayDate(checkInDate) + ' — ' + displayDate(checkOutDate) : 'Select dates'}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-amber-300" />
        </button>
        {openPanel === 'dates' && (
          <div data-lenis-prevent className={'booking-popover absolute left-0 z-[100] w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl p-4 ' + popoverPosition}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-serif text-lg text-burgundy-950">{visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p className="text-xs text-stone-600">{dateStep === 'checkIn' ? 'Select check-in' : 'Select check-out'}</p>
              </div>
              <div className="flex gap-1">
                <button type="button" aria-label="Previous month" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))} className="rounded-lg p-2 text-burgundy-950 hover:bg-white/60"><ChevronLeft className="h-4 w-4" /></button>
                <button type="button" aria-label="Next month" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))} className="rounded-lg p-2 text-burgundy-950 hover:bg-white/60"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-stone-500">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => <span key={day} className="py-1">{day}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {calendarCells.map((day, index) => {
                const value = day ? dateValue(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day)) : '';
                const disabled = !day || value < today || (dateStep === 'checkOut' && value <= checkInDate);
                const selected = value === checkInDate || value === checkOutDate;
                const inRange = value > checkInDate && value < checkOutDate;
                return day ? (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => selectDate(value)}
                    aria-label={new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day).toDateString()}
                    className={'aspect-square rounded-lg text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ' + (selected ? 'bg-burgundy-800 text-white' : inRange ? 'bg-burgundy-100 text-burgundy-950' : 'text-stone-800 hover:bg-white/70')}
                  >
                    {day}
                  </button>
                ) : <span key={'blank-' + index} />;
              })}
            </div>
            <p className="mt-3 border-t border-burgundy-950/10 pt-3 text-xs text-stone-600">
              {displayDate(checkInDate)} — {displayDate(checkOutDate)} · {nights} {nights === 1 ? 'night' : 'nights'}
            </p>
          </div>
        )}
      </div>

      <div className="relative md:col-span-2">
        <button
          type="button"
          onClick={() => openPanel === 'guests' ? setOpenPanel(null) : showPanel('guests')}
          aria-expanded={openPanel === 'guests'}
          className="flex h-full min-h-[76px] w-full items-center gap-4 rounded-xl border border-white/15 bg-white/10 px-4 text-left text-white transition-colors hover:bg-white/15"
        >
          <Users className="h-6 w-6 shrink-0" strokeWidth={1.6} />
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-base">Guests</span>
            <span className="block text-sm text-white/70">{guests.adults + guests.children} Guests</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-amber-300" />
        </button>
        {openPanel === 'guests' && (
          <div data-lenis-prevent className={'booking-popover absolute right-0 z-[100] w-[min(19rem,calc(100vw-2.5rem))] rounded-2xl p-4 ' + popoverPosition}>
            {[
              ['adults', 'Adults', 'Ages 13+'],
              ['children', 'Children', 'Ages 0–12'],
              ['rooms', 'Suites', 'Rooms to reserve']
            ].map(([field, title, subtitle]) => (
              <div key={field} className="flex items-center justify-between border-b border-burgundy-950/10 py-2.5 last:border-0">
                <span><span className="block text-sm font-semibold text-burgundy-950">{title}</span><span className="text-xs text-stone-600">{subtitle}</span></span>
                <span className="flex items-center gap-2">
                  <button type="button" disabled={guests[field] <= (field === 'children' ? 0 : 1)} aria-label={'Remove ' + title.toLowerCase()} onClick={() => updateGuests(field, -1)} className="rounded-full border border-burgundy-950/20 p-1.5 text-burgundy-950 disabled:opacity-30"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-5 text-center text-sm font-semibold">{guests[field]}</span>
                  <button type="button" aria-label={'Add ' + title.toLowerCase()} onClick={() => updateGuests(field, 1)} className="rounded-full border border-burgundy-950/20 p-1.5 text-burgundy-950"><Plus className="h-3.5 w-3.5" /></button>
                </span>
              </div>
            ))}
            <button type="button" onClick={() => { setSearchParams((previous) => ({ ...previous, guests })); setOpenPanel(null); }} className="mt-3 w-full rounded-lg bg-burgundy-800 py-2.5 text-sm font-semibold text-white">Apply Guests</button>
          </div>
        )}
      </div>

      <button type="submit" className="flex min-h-[76px] items-center justify-center gap-3 rounded-xl bg-burgundy-800 px-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-burgundy-700 md:col-span-2">
        Find Your Stay <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

export default SearchConsole;
