export const HOTELS_DATA = [
  {
    id: "rs-paris",
    name: "Le Grand Palais Royal",
    tagline: "Haute Hospitality on Place Vendôme",
    location: "Paris, France",
    neighborhood: "1st Arrondissement, Place Vendôme",
    propertyType: "Palace & Heritage",
    rating: 4.98,
    reviewsCount: 384,
    starRating: 5,
    michelinKeys: 3,
    featured: true,
    basePrice: 850,
    originalPrice: 1020,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Michelin Star Dining",
      "Private Butler",
      "Spa & Wellness",
      "High-Speed WiFi",
      "Chauffeur Service",
      "Fitness Center",
      "Pet Concierge",
      "Champagne Cellar"
    ],
    highlights: [
      "Direct balcony vistas overlooking the historic Paris skyline",
      "Two-star Michelin restaurant led by Chef Antoine Laurent",
      "Subterranean Dior wellness spa with heated marble plunge pool",
      "Complimentary Rolls-Royce airport chauffeur transfer"
    ],
    description: "Nestled in the beating heart of Paris on Place Vendôme, Le Grand Palais Royal exemplifies the golden age of French hospitality reimagined with contemporary burgundy elegance. From bespoke velvet furnishings to 19th-century gilded mouldings, every sanctuary offers an intimate haven of supreme luxury.",
    rooms: [
      {
        id: "room-paris-1",
        name: "Deluxe Vendôme King Suite",
        size: "58 m² / 624 sq ft",
        capacity: 2,
        bed: "Signature California King",
        view: "Courtyard Garden & Fountain",
        price: 850,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        features: ["Private Italian marble bath", "Hermès amenities", "Dyson Supersonic styling bar", "24/7 Concierge"]
      },
      {
        id: "room-paris-2",
        name: "Prestige Eiffel Terrace Suite",
        size: "95 m² / 1,022 sq ft",
        capacity: 3,
        bed: "Master King + Velvet Daybed",
        view: "Eiffel Tower & Paris Skyline",
        price: 1350,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 72 hours before check-in",
        features: ["Private landscaped terrace", "Complimentary champagne bar", "Soaking bathtub with skyline view", "Dedicated butler"]
      },
      {
        id: "room-paris-3",
        name: "The Royal Ducal Penthouse",
        size: "180 m² / 1,937 sq ft",
        capacity: 4,
        bed: "Two King Master Bedrooms",
        view: "360° Panoramic Paris",
        price: 2600,
        breakfastIncluded: true,
        cancellationPolicy: "Flexible cancellation with personal concierge",
        features: ["Private elevator access", "Full private chef dining room", "Fireplace lounge", "Unlimited private spa access"]
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Eleanor Vance-Croft",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        date: "October 2026",
        rating: 5.0,
        comment: "Unmatched standard of elegance. The private butler service was invisible yet flawlessly attentive. The breakfast croissant service on our private terrace will remain unforgettable."
      },
      {
        id: "rev-2",
        author: "Lord Julian Sterling",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        date: "September 2026",
        rating: 4.9,
        comment: "The Burgundy accents throughout the suite give it a sultry, truly imperial feel. R's Hotels continues to set the global benchmark for ultra-luxury."
      }
    ]
  },
  {
    id: "rs-amalfi",
    name: "Villa Bellissima Coastline",
    tagline: "Clifftop Sanctuary Overlooking Positano",
    location: "Amalfi Coast, Italy",
    neighborhood: "Cliffside Via Panoramica, Positano",
    propertyType: "Coastal Villas",
    rating: 4.96,
    reviewsCount: 290,
    starRating: 5,
    michelinKeys: 3,
    featured: true,
    basePrice: 980,
    originalPrice: 1190,
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Infinity Pool",
      "Ocean View",
      "Helipad Access",
      "Spa & Wellness",
      "Private Butler",
      "Michelin Star Dining",
      "High-Speed WiFi",
      "Chauffeur Service"
    ],
    highlights: [
      "Tiered infinity pool carved into the Mediterranean limestone",
      "Private boat charter access to Capri directly from our cove",
      "Terrace dining overlooking pastel-washed Positano houses",
      "Sommelier-curated cellar of rare Super Tuscan vintages"
    ],
    description: "Perched high above the shimmering sapphire waters of the Tyrrhenian Sea, Villa Bellissima provides private cliffside seclusion. Savor fragrant lemon groves, hand-painted Vietri tiles, and an azure horizon that melts into golden Mediterranean sunsets.",
    rooms: [
      {
        id: "room-amalfi-1",
        name: "Cliffside Azure Suite",
        size: "62 m² / 667 sq ft",
        capacity: 2,
        bed: "Plush King Bed",
        view: "Unobstructed Tyrrhenian Sea",
        price: 980,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 7 days before check-in",
        features: ["Private bougainvillea terrace", "Outdoor hydro-massage tub", "Aqua di Parma bath suite", "Morning espresso cart"]
      },
      {
        id: "room-amalfi-2",
        name: "Villa Bella Vista Suite with Plunge Pool",
        size: "110 m² / 1,184 sq ft",
        capacity: 3,
        bed: "King Bed + Single Daybed",
        view: "Positano Cliffs & Open Sea",
        price: 1650,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 5 days before check-in",
        features: ["Private heated infinity plunge pool", "Outdoor sun deck", "Personal cocktail masterclass", "Dedicated villa host"]
      }
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Camilla & Marco Rossi",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        date: "October 2026",
        rating: 5.0,
        comment: "Waking up to the sea breeze and the lemon trees on the terrace is pure heaven. The heated infinity plunge pool made our anniversary so magical."
      }
    ]
  },
  {
    id: "rs-kyoto",
    name: "The Kyoto Imperial Ryokan",
    tagline: "Serene Zen Sanctuaries in Arashiyama",
    location: "Kyoto, Japan",
    neighborhood: "Arashiyama Bamboo Forest Reserve",
    propertyType: "Palace & Heritage",
    rating: 4.99,
    reviewsCount: 412,
    starRating: 5,
    michelinKeys: 3,
    featured: true,
    basePrice: 920,
    originalPrice: 1100,
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Spa & Wellness",
      "Michelin Star Dining",
      "Private Butler",
      "High-Speed WiFi",
      "Fitness Center",
      "Pet Concierge"
    ],
    highlights: [
      "Natural mineral spring onsen baths crafted from 300-year-old Hinoki wood",
      "Authentic multi-course Kaiseki dining prepared by master chef Kazunori",
      "Private moss garden pavilions and seasonal tea ceremony master",
      "Direct secluded wooden path to the Arashiyama bamboo sanctuary"
    ],
    description: "An oasis of meditative peace enveloped by ancient bamboo groves and bubbling mountain streams. The Kyoto Imperial Ryokan bridges timeless Japanese craftsmanship with bespoke modern comforts, featuring private open-air onsens and tatami suites.",
    rooms: [
      {
        id: "room-kyoto-1",
        name: "Hinoki Onsen Garden Suite",
        size: "70 m² / 753 sq ft",
        capacity: 2,
        bed: "Traditional Silk Futon / Low Luxury King",
        view: "Private Zen Moss Garden",
        price: 920,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        features: ["Private outdoor Hinoki hot-spring tub", "Matcha tea service", "Yukata robes & wooden clogs", "Garden soundscape"]
      },
      {
        id: "room-kyoto-2",
        name: "Emperor's Pavilion Sanctuary",
        size: "140 m² / 1,506 sq ft",
        capacity: 4,
        bed: "Two Japanese Master Suites",
        view: "Bamboo Grove & Stream",
        price: 1850,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 72 hours before check-in",
        features: ["Dual private thermal baths", "Kaiseki in-room service", "Private meditation courtyard", "Master tea ceremony"]
      }
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Kenji & Sarah Sato",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        date: "October 2026",
        rating: 5.0,
        comment: "The quietude here touches your soul. Soaking in the steaming Hinoki bath while gentle rain falls on the bamboo leaves is transcendent."
      }
    ]
  },
  {
    id: "rs-aspen",
    name: "Sanctuary Alpine Reserve",
    tagline: "Ultra-Chic Ski-In Chalets in the Rockies",
    location: "Aspen, United States",
    neighborhood: "Red Mountain Foothills, Colorado",
    propertyType: "Alpine Chalets",
    rating: 4.94,
    reviewsCount: 215,
    starRating: 5,
    michelinKeys: 2,
    featured: true,
    basePrice: 1150,
    originalPrice: 1350,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Helipad Access",
      "Spa & Wellness",
      "Michelin Star Dining",
      "Private Butler",
      "Fitness Center",
      "High-Speed WiFi",
      "Chauffeur Service",
      "Pet Concierge"
    ],
    highlights: [
      "Direct ski-in / ski-out access to Aspen Mountain's premier slopes",
      "Outdoor heated pool with glass borders overlooking snowy pine peaks",
      "Burgundy velvet fireside cigar & scotch library",
      "Custom heated boot room and ski valet technicians"
    ],
    description: "Rising against the snow-capped majesty of Aspen, Sanctuary Alpine Reserve is the pinnacle of North American mountain luxury. Hand-hewn timber, crackling stone fireplaces, and floor-to-ceiling glass frame awe-inspiring winter wonderlands.",
    rooms: [
      {
        id: "room-aspen-1",
        name: "Timberline Hearth Suite",
        size: "75 m² / 807 sq ft",
        capacity: 2,
        bed: "Custom Pillowtop King Bed",
        view: "Snowy Aspen Pines",
        price: 1150,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 5 days before check-in",
        features: ["Wood-burning stone fireplace", "Cashmere throws", "Heated bathroom slate floors", "Balcony hot tub"]
      },
      {
        id: "room-aspen-2",
        name: "The Summit Grand Lodge Suite",
        size: "165 m² / 1,776 sq ft",
        capacity: 5,
        bed: "Two King Rooms + Bunk Nook",
        view: "360° Mountain Peaks",
        price: 2400,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 7 days before check-in",
        features: ["Private ski locker & boot warmer", "Double-sided hearth", "Full bar setup", "Private sauna"]
      }
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Harrison Ford-Wellington",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        date: "February 2026",
        rating: 4.9,
        comment: "The ski valet made every morning effortless. Returning to our suite with a crackling hearth and mulled wine already prepared was pure perfection."
      }
    ]
  },
  {
    id: "rs-santorini",
    name: "Oia Azure Cliff Suites",
    tagline: "White Cycladic Elegance & Golden Aegean Sunsets",
    location: "Santorini, Greece",
    neighborhood: "Caldera Ridge, Oia",
    propertyType: "Coastal Villas",
    rating: 4.97,
    reviewsCount: 340,
    starRating: 5,
    michelinKeys: 3,
    featured: false,
    basePrice: 790,
    originalPrice: 950,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Infinity Pool",
      "Ocean View",
      "Spa & Wellness",
      "High-Speed WiFi",
      "Chauffeur Service"
    ],
    highlights: [
      "Unrivaled front-row seating for the world-famous Oia caldera sunset",
      "Cave suites carved into volcanic rock with cooling micro-climates",
      "Private infinity plunge pools facing the sunken volcano",
      "Organic Greek vineyard tasting menu every evening"
    ],
    description: "Draped across the volcanic cliffs of Santorini, Oia Azure Cliff Suites fuses sculpted Cycladic architecture with opulent burgundy textures. An intimate Greek paradise where every terrace captures the golden hues of sunset.",
    rooms: [
      {
        id: "room-santorini-1",
        name: "Caldera Sunset Cave Suite",
        size: "52 m² / 560 sq ft",
        capacity: 2,
        bed: "Sculpted Aegean King",
        view: "Volcanic Caldera & Sunset",
        price: 790,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        features: ["Private cave plunge pool", "Sunset patio", "Artisan Greek breakfast delivered daily", "Rain shower"]
      },
      {
        id: "room-santorini-2",
        name: "The Royal Caldera Villa",
        size: "115 m² / 1,237 sq ft",
        capacity: 4,
        bed: "Two King Beds",
        view: "Endless Aegean Sea",
        price: 1450,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 5 days before check-in",
        features: ["Expansive wrap-around sun deck", "Heated infinity pool", "Outdoor bar", "Private butler"]
      }
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Sophia L.",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
        date: "September 2026",
        rating: 5.0,
        comment: "No photo can prepare you for the beauty of this view. Sitting in our private plunge pool watching the sun slip behind the caldera was the highlight of our European tour."
      }
    ]
  },
  {
    id: "rs-maldives",
    name: "Veligandu Overwater Atoll",
    tagline: "Private Ocean Mansions Suspended Above Coral Reefs",
    location: "North Malé Atoll, Maldives",
    neighborhood: "Ari Atoll Private Lagoon",
    propertyType: "Coastal Villas",
    rating: 4.99,
    reviewsCount: 520,
    starRating: 5,
    michelinKeys: 3,
    featured: true,
    basePrice: 1400,
    originalPrice: 1750,
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1688949078626-a358f500e063?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1753939223042-872934ffda15?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1751525668534-33a8fa152792?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1608447337729-ccaf486a8c8c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Ocean View",
      "Infinity Pool",
      "Helipad Access",
      "Spa & Wellness",
      "Private Butler",
      "Michelin Star Dining",
      "High-Speed WiFi"
    ],
    highlights: [
      "Glass floor viewing panels inside master bedrooms over living coral reefs",
      "Private catamaran transfers from Velana International Airport",
      "Subaquatic 6-meter underwater wine cellar and dining experience",
      "Dedicated 24-hour 'Barefoot Butler' at your service"
    ],
    description: "Float above crystalline turquoise waters at Veligandu Overwater Atoll. Each private ocean pavilion offers direct steps into vibrant lagoons teeming with sea turtles, manta rays, and pristine coral reefs.",
    rooms: [
      {
        id: "room-maldives-1",
        name: "Ocean Pavilion with Glass Floor",
        size: "120 m² / 1,291 sq ft",
        capacity: 2,
        bed: "Floating King Bed",
        view: "Endless Turquoise Lagoon",
        price: 1400,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 14 days before check-in",
        features: ["Private infinity plunge pool", "Glass floor view panel", "Catamaran net sunbed over water", "Personal snorkeling equipment"]
      },
      {
        id: "room-maldives-2",
        name: "Two-Story Lagoon Residence",
        size: "240 m² / 2,583 sq ft",
        capacity: 4,
        bed: "Two Ocean-Facing Master Kings",
        view: "360° Lagoon & Coral Atoll",
        price: 2800,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 14 days before check-in",
        features: ["Private spiral water slide into the sea", "Rooftop star-gazing deck", "Private chef breakfast", "In-villa massage suite"]
      }
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Liam & Chloe Montgomery",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
        date: "August 2026",
        rating: 5.0,
        comment: "Heaven on Earth. Having baby blacktip reef sharks swim directly under your glass floor while drinking coffee is something we will talk about for the rest of our lives."
      }
    ]
  },
  {
    id: "rs-zurich",
    name: "The Limmat Sovereign Penthouse",
    tagline: "Swiss Precision & Old-World Aristocratic Glamour",
    location: "Zurich, Switzerland",
    neighborhood: "Bahnhofstrasse & Old Town Waterfront",
    propertyType: "Urban Penthouses",
    rating: 4.93,
    reviewsCount: 180,
    starRating: 5,
    michelinKeys: 2,
    featured: false,
    basePrice: 890,
    originalPrice: 1050,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Spa & Wellness",
      "High-Speed WiFi",
      "Fitness Center",
      "Chauffeur Service",
      "Pet Concierge",
      "Private Butler"
    ],
    highlights: [
      "Rooftop observatory overlooking Lake Zurich and the Swiss Alps",
      "Private Swiss chocolate and cigar tasting salon",
      "Valmont thermal hydro-therapy spa facilities",
      "Direct walking distance to high fashion boutiques on Bahnhofstrasse"
    ],
    description: "Commanding views over the Limmat River and the snowy silhouettes of the Swiss Alps, The Limmat Sovereign brings bespoke Swiss hospitality and refined burgundy craftsmanship to Zurich's most exclusive address.",
    rooms: [
      {
        id: "room-zurich-1",
        name: "Riverview Sovereign Junior Suite",
        size: "60 m² / 645 sq ft",
        capacity: 2,
        bed: "Swiss Handcrafted King",
        view: "Limmat River & Historic Guild Houses",
        price: 890,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 24 hours before check-in",
        features: ["Swiss granite bathroom", "Soundproof triple-glazed windows", "Artisan Nespresso and loose leaf tea bar"]
      },
      {
        id: "room-zurich-2",
        name: "The Alpine Crown Penthouse",
        size: "175 m² / 1,883 sq ft",
        capacity: 4,
        bed: "Two Master Suites",
        view: "Lake Zurich & Glarus Alps",
        price: 2100,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        features: ["Private rooftop plunge pool", "Private Finnish sauna", "Wine cellar", "Dedicated Mercedes Maybach"]
      }
    ],
    reviews: [
      {
        id: "rev-8",
        author: "Dr. Adrian Von Bern",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
        date: "September 2026",
        rating: 4.9,
        comment: "Flawless execution. Quiet, immaculate, and the view over the river at sunrise is truly inspiring."
      }
    ]
  },
  {
    id: "rs-cappadocia",
    name: "Cappadocia Cave Palace",
    tagline: "Ancient Byzantine Caverns Transformed into Royalty",
    location: "Cappadocia, Turkey",
    neighborhood: "Göreme Valley Historical Reserve",
    propertyType: "Boutique Hotels",
    rating: 4.95,
    reviewsCount: 260,
    starRating: 5,
    michelinKeys: 2,
    featured: false,
    basePrice: 650,
    originalPrice: 780,
    images: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Spa & Wellness",
      "Infinity Pool",
      "High-Speed WiFi",
      "Michelin Star Dining",
      "Chauffeur Service"
    ],
    highlights: [
      "Sunrise hot air balloon spectacles viewed directly from your bed or terrace",
      "Restored thousand-year-old rock-cut chambers with natural climate control",
      "Traditional Turkish Hamam with eucalyptus steam rooms",
      "Private sunrise balloon flights arranged exclusively for hotel guests"
    ],
    description: "Carved into the mystical fairy chimneys of Cappadocia, this boutique cave palace seamlessly blends ancient Byzantine architecture with decadent burgundy silk fabrics, handcrafted brass, and private thermal pools.",
    rooms: [
      {
        id: "room-cappadocia-1",
        name: "Sultan's Fairy Chimney Cave Suite",
        size: "65 m² / 700 sq ft",
        capacity: 2,
        bed: "Hand-carved Stone King Bed",
        view: "Fairy Chimneys & Valley",
        price: 650,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        features: ["In-room carved stone hot tub", "Turkish breakfast feast", "Silk slippers & robes", "Antique Anatolian carpets"]
      },
      {
        id: "room-cappadocia-2",
        name: "The Imperial Balloon Horizon Suite",
        size: "125 m² / 1,345 sq ft",
        capacity: 3,
        bed: "Master King + Single Divan",
        view: "Unobstructed Sunrise Balloon Flight Path",
        price: 1100,
        breakfastIncluded: true,
        cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        features: ["Private panoramic rooftop terrace", "Heated outdoor rock pool", "Complimentary champagne sunrise basket"]
      }
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Natasha & Viktor V.",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        date: "October 2026",
        rating: 5.0,
        comment: "Watching 150 hot air balloons rise in silence as the dawn sky turned pink and gold while having tea on our terrace was one of the greatest moments of our lives."
      }
    ]
  }
];

export const DESTINATIONS = [
  { name: "Paris", country: "France", propertiesCount: 14, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { name: "Amalfi Coast", country: "Italy", propertiesCount: 9, image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80" },
  { name: "Kyoto", country: "Japan", propertiesCount: 11, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  { name: "Aspen", country: "United States", propertiesCount: 8, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" },
  { name: "Santorini", country: "Greece", propertiesCount: 12, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80" },
  { name: "Maldives", country: "Maldives", propertiesCount: 7, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80" }
];
