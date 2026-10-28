import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import SearchConsole from './SearchConsole';

const HeroSection = () => {
  const { navigateTo } = useBooking();

  return (
    <section className="hero-section relative z-40 flex min-h-[calc(100svh-56px)] flex-col justify-between px-5 pb-5 pt-12 sm:min-h-[calc(100svh-64px)] sm:px-8 sm:pb-8 lg:px-12 lg:pt-16">
      <div className="hero-content relative mx-auto flex w-full max-w-[1440px] flex-1 items-center py-8">
        <div className="hero-hotel-visual pointer-events-none absolute inset-y-0 -right-8 hidden w-[70%] lg:block" aria-hidden="true">
          <div className="hero-hotel-glow absolute inset-x-[10%] bottom-[3%] h-1/2" />
          <img src="/hotel-cutout.png" alt="" className="hero-hotel-image relative h-full w-full object-contain object-right-bottom" />
        </div>

        <div className="relative z-10 max-w-[760px] text-white [text-shadow:0_2px_18px_rgba(24,3,11,0.55)]">
          <p className="hero-eyebrow mb-5 text-xs font-bold uppercase tracking-[0.42em] text-amber-300 sm:text-sm">
            The art of staying beautifully
          </p>
          <h1 className="hero-title font-serif text-[clamp(3.25rem,6.3vw,7rem)] font-normal leading-[0.94] tracking-[-0.055em]">
            Where Every Stay<br />
            Becomes<br />
            <em className="font-normal">a Story.</em>
          </h1>
          <p className="hero-description mt-8 max-w-xl font-serif text-xl leading-snug sm:text-2xl lg:text-[1.7rem]">
            Discover handpicked sanctuaries,<br className="hidden sm:block" /> extraordinary suites, and timeless escapes.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => navigateTo('hotels')}
              className="hero-action-button inline-flex min-h-14 items-center justify-center gap-5 rounded-xl bg-ivory-100 px-6 text-sm font-semibold text-burgundy-950 shadow-lg transition-colors hover:bg-white sm:px-8 sm:text-base"
            >
              Explore Sanctuaries <ArrowRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('hotels')}
              className="hero-action-button inline-flex min-h-14 items-center justify-center gap-5 rounded-xl border border-white/70 bg-burgundy-950/20 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:px-8 sm:text-base"
            >
              View Suites <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1320px]">
        <SearchConsole placement="above" />
      </div>
    </section>
  );
};

export default HeroSection;
