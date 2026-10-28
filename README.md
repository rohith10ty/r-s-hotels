# R's Hotels — Luxury Hotel Management & Booking Frontend

An ultra-premium, responsive hotel management and booking web application crafted for **R's Hotels** with a signature **Burgundy & White** aesthetic, frosted glassmorphism, Lenis smooth scrolling, the Outfit typography, and dynamic scroll-triggered repetition effects.

---

## 🌟 Key Features

1. **Curated Hero Experience**
   - Architectural curved canopy arch backdrop matching modern luxury fintech/hospitality aesthetics.
   - Split hero headline (*"Curated stays."* · *[3D Luxury Trunk Showcase]* · *"Timeless luxury."*).
   - Interactive 3D floating centerpiece featuring gold hardware, keycards, Michelin key badges, and cursor-reactive tilt.
   - Frosted blurred search console docking directly under the hero with quick destination suggestions, date pickers with live nights counter, and guest/room counters.

2. **Text Repetition Scroll Effect (Codrops / Dr. Dabber Algorithm)**
   - Recreated from `23-20261028T061333Z-1-001.zip` using GSAP and reactive scroll intersection observers.
   - Staggered outline typography fanning out vertically and horizontally on scroll for *"SANCTUARY"* and *"TIMELESS"*.

3. **Hotel Listing & Filtering Engine**
   - Interactive filters:
     - Nightly rate range slider ($500 – $3,000+)
     - Guest rating filter (Any, 4.9+, 4.95+)
     - Sanctuary collections (Palace & Heritage, Coastal Villas, Alpine Chalets, Urban Penthouses, Boutique Hotels)
     - Luxury amenities (Infinity Pool, Michelin Dining, Private Butler, Helipad Access, Spa, etc.)
     - Free cancellation toggle
   - Sorting by: Curator's Pick, Price (Low to High), Price (High to Low), Guest Rating, and Most Reviewed.
   - Dual view modes: High-density Grid View and expansive List View.
   - Active filter chips with instant removal and full reset.

4. **Hotel Details Page**
   - High-resolution architectural photo gallery with interactive thumbnail switching.
   - Full story, property highlights, and luxury amenity icons.
   - Room/Suite selection engine with real-time specs (sqm, capacity, bed type, view, inclusions).
   - Verified guest appraisals and sticky reservation summary card.

5. **Dynamic Booking Modal & Checkout Flow**
   - Live night calculations & dynamic room tier switching inside checkout.
   - Luxury add-on rituals (Dom Pérignon Vintage Champagne & Caviar, Maybach Airport Chauffeur, Botanical Hydro-Spa, In-Suite Breakfast).
   - Promo code validation (Try `RHOTELS10` for 10% off or `WELCOME20` for 20% off).
   - Full guest details form validation.
   - Payment method toggle (Credit Card with card masking or Pay at Hotel).
   - Confetti burst celebration upon booking confirmation!

6. **"My Bookings" Page & LocalStorage Persistence**
   - Pre-loaded with an authentic confirmed booking for instant testing.
   - Filter by: All Bookings, Confirmed, and Cancelled.
   - Full booking details: Reference ID, suite type, check-in/out dates, guest info, and itemized paid amounts.
   - **View Printable Voucher / Receipt Modal**: Complete with digital verification QR code, itemized invoice breakdown, and 1-click print functionality (`window.print()`).
   - **Cancel Reservation Modal**: Reason selection, refund policy verification, and live status update.

7. **Design & Technical Requirements**
   - **Burgundy & White Palette**: Rich deep Burgundies (`#4D0E24`, `#60112D`, `#751336`), soft rose creams (`#FAF2F4`, `#F5E4E9`), and crisp white.
   - **Frosted Blurred Glass Cards**: Utilizing Tailwind `backdrop-blur-md` and `backdrop-blur-xl` with translucent white/burgundy borders.
   - **Lenis Smooth Scroll**: Fluid momentum scrolling across the entire page.
   - **Outfit Font**: Universal Google Font `Outfit` applied across all typography.
   - **Hidden Scrollbars**: Global zero-width scrollbar rules for an immaculate editorial interface.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

The application runs locally on `http://localhost:3000/`.
