import { ReviewTrip } from "./review-trip";
import { ReviewCost } from "./review-cost";
import { ReviewDetails } from "./review-details";
import type { Vehicle, LocationPoint } from "./types";

type BookingReviewProps = {
  vehicle: Vehicle;
  pickup: string;
  destination: string;
  phone: string;
  notes: string;
  photos: File[];
  pickupPoint: LocationPoint | null;
  destinationPoint: LocationPoint | null;
  onEditTrip: () => void;
  onEditVehicle: () => void;
  onConfirm: () => void;
  submitting?: boolean;
};

export function BookingReview({
  vehicle,
  pickup,
  destination,
  phone,
  notes,
  photos,
  pickupPoint,
  destinationPoint,
  onEditTrip,
  onEditVehicle,
  onConfirm,
  submitting,
}: BookingReviewProps) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.06fr_1fr] lg:gap-10">
      <div className="space-y-5">
        <ReviewTrip
          pickup={pickup}
          destination={destination}
          pickupPoint={pickupPoint}
          destinationPoint={destinationPoint}
          onEdit={onEditTrip}
        />
        <section
          aria-label="السطحة المختارة"
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="h-[88px] w-[112px] rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[#969bb9]">نوع السطحة المختار</p>
            <h2 className="mt-1 text-base font-bold text-[#dfe0ec]">
              {vehicle.name}
            </h2>
            <p className="mt-1 text-xs leading-6 text-[#969bb9]">
              {vehicle.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onEditVehicle}
            className="text-sm font-bold text-[#c4a34f]"
          >
            تغيير
          </button>
        </section>
        <ReviewDetails notes={notes} phone={phone} photos={photos} />
      </div>
      <ReviewCost
        submitting={submitting}
        vehicle={vehicle}
        onConfirm={onConfirm}
        onEdit={onEditTrip}
      />
    </div>
  );
}
