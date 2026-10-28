import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import TextRepetitionBanner from '../components/common/TextRepetitionBanner';
import FeaturedSanctuaries from '../components/home/FeaturedSanctuaries';
import CuratedCollections from '../components/home/CuratedCollections';
import ExperienceShowcase from '../components/home/ExperienceShowcase';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section (Compact, centered cutout, rectangular navbar, visible above the fold) */}
      <HeroSection />

      {/* 2. Text Repetition Effect 1: SANCTUARY */}
      <TextRepetitionBanner
        word="SANCTUARY"
        subtitle="THE ARCHITECTURE OF UNCOMPROMISED TRANQUILITY"
        color="#751336"
      />

      {/* 3. Featured Masterpiece Residences */}
      <FeaturedSanctuaries />

      {/* 4. Text Repetition Effect 2: DESTINATIONS */}
      <TextRepetitionBanner
        word="DESTINATIONS"
        subtitle="ICONIC HAVENS ACROSS 80+ CITIES WORLDWIDE"
        color="#540B26"
      />

      {/* 5. Curated Destinations */}
      <CuratedCollections />

      {/* 6. Text Repetition Effect 3: RESIDENCES / TIMELESS */}
      <TextRepetitionBanner
        word="RESIDENCES"
        subtitle="WHERE TIMELESS LUXURY BECOMES A LIVING HERITAGE"
        color="#670D2F"
      />

      {/* 7. The R's Hospitality Experience */}
      <ExperienceShowcase />
    </div>
  );
};

export default HomePage;
