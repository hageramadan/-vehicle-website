export type Order = {
  id: string;
  isDemo?: boolean;
  vehicle: string;
  pickup: string;
  destination: string;
  price: number;
  date: string;
  status: string;
  notes: string;
  phone?: string;
  createdAt?: string;
  cancelledAt?: string;
  photoCount?: number;
  distanceKm?: number;
  provider?: { name: string; phone?: string; rating?: number };
  timeline?: { label: string; at?: string }[];
  pickupPoint?: LocationPoint;
  destinationPoint?: LocationPoint;
};

export type Vehicle = {
  id: string;
  isDemo?: boolean;
  name: string;
  description: string;
  price: number;
  image: string;
};
export type LocationPoint = { lat: number; lng: number; label: string };
