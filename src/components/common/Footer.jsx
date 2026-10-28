import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Crown, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const { navigateTo, showToast } = useBooking();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Welcome to the Private R\'s Concierge Society.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-burgundy-950 text-white pt-14 pb-10 border-t border-burgundy-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter Card */}
        <div className="glass-panel-dark rounded-2xl p-6 sm:p-8 mb-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-300 mb-1">
              <Crown className="w-3.5 h-3.5" />
              Private Invitations
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Join the R's Concierge Circle
            </h3>
            <p className="text-xs text-rose-200/70 mt-1 font-medium">
              Receive secret seasonal openings, private aviation perks, and invitation-only suite previews.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your VIP email address"
              className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-rose-200/50 text-xs focus:outline-none focus:border-rose-400 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-white text-burgundy-950 font-bold text-xs hover:bg-rose-100 transition-colors shadow-md"
            >
              Request Access
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-burgundy-800/60 text-xs">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-white text-burgundy-950 flex items-center justify-center font-black text-xs">
                R
              </div>
              <span className="text-base font-black tracking-[0.2em] text-white uppercase block">R's Hotels</span>
            </div>
            <p className="text-rose-200/70 max-w-sm leading-relaxed text-xs font-medium">
              Handcrafting moments of timeless repose across the world’s most mesmerizing horizons. Place Vendôme · Positano · Arashiyama · Aspen · Oia.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-rose-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified 5-Star Michelin Key Standard</span>
            </div>
          </div>

          {/* Column 1: Sanctuaries */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs mb-3">Sanctuaries</h4>
            <ul className="space-y-2 text-rose-200/70 font-medium">
              <li>
                <button onClick={() => navigateTo('hotels')} className="hover:text-white transition-colors">
                  Paris Vendôme
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('hotels')} className="hover:text-white transition-colors">
                  Villa Bellissima Amalfi
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('hotels')} className="hover:text-white transition-colors">
                  Kyoto Imperial Ryokan
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('hotels')} className="hover:text-white transition-colors">
                  Aspen Alpine Reserve
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Experiences */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs mb-3">Experiences</h4>
            <ul className="space-y-2 text-rose-200/70 font-medium">
              <li><span className="hover:text-white transition-colors cursor-pointer">Private Jet Charter</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Michelin Chef Tastings</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Hinoki Onsen Rituals</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Helipad Mountain Excursions</span></li>
            </ul>
          </div>

          {/* Column 3: Guest Concierge */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs mb-3">Concierge</h4>
            <ul className="space-y-2 text-rose-200/70 font-medium">
              <li>
                <button onClick={() => navigateTo('my-bookings')} className="hover:text-white transition-colors">
                  My Bookings
                </button>
              </li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Best Rate Guarantee</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">VIP Cancellation Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Contact Private Butler</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-rose-200/60 gap-3">
          <div>
            © {new Date().getFullYear()} R's Hotels Group S.A. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Notice</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Hospitality</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
