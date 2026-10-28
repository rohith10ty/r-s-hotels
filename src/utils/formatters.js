export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const calculateNights = (checkInStr, checkOutStr) => {
  if (!checkInStr || !checkOutStr) return 1;
  const inDate = new Date(checkInStr);
  const outDate = new Date(checkOutStr);
  const diffTime = outDate.getTime() - inDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

export const generateBookingId = (prefix = 'RS') => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
};

export const ADD_ON_SERVICES = [
  {
    id: 'champagne',
    name: 'Dom Pérignon Vintage Welcome & Caviar',
    price: 240,
    description: 'Chilled bottle awaiting in your suite with artisanal caviar service.'
  },
  {
    id: 'chauffeur',
    name: 'Private Luxury Mercedes Maybach Airport Chauffeur',
    price: 180,
    description: 'Bespoke curbside greeting and private transfer to and from the sanctuary.'
  },
  {
    id: 'spa',
    name: 'Couples Bespoke Botanical Hydro-Spa Ritual (90m)',
    price: 380,
    description: 'Private candlelit thermal suite with custom essential botanical oils.'
  },
  {
    id: 'breakfast',
    name: 'In-Suite Champagne Breakfast Extravaganza (Daily)',
    price: 120,
    description: 'Chef-crafted continental spread served fresh on your private terrace.'
  }
];
