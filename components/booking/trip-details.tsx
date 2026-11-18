import { LocationField } from "./location-field";
import { AdditionalDetails } from "./additional-details";
import type { Vehicle } from "./types";

type TripDetailsProps = {
  vehicle: Vehicle;
  pickup: string;
  destination: string;
  phone: string;
  notes: string;
  photo: File[];
  accountPhone: string;
  onPhoneChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onPhotoChange: (value: File[]) => void;
  onOpenPickup: () => void;
  onOpenDestination: () => void;
  onLocate: () => void;
  onChangeVehicle: () => void;
};

export function TripDetails({
  pickup,
  destination,
  onOpenPickup,
  onOpenDestination,
  onLocate,
  ...additionalDetails
}: TripDetailsProps) {
  return (
    <div className="mx-auto grid w-full max-w-[calc(100%_-_16px)] grid-cols-1 items-start gap-5 sm:max-w-none lg:grid-cols-[minmax(0,1fr)_minmax(0,1.14fr)]">
      <div className="space-y-5">
        <LocationField
          number={1}
          label="موقع الاستلام"
          subtitle="حدد موقع المركبة الحالي"
          searchLabel="ابحث عن الموقع"
          placeholder="حدد موقع الاستلام"
          value={pickup}
          onOpen={onOpenPickup}
          onLocate={onLocate}
        />
        <LocationField
          number={2}
          label="موقع الوجهة"
          subtitle="أين تريد نقل المركبة؟"
          searchLabel="ابحث عن الوجهة"
          placeholder="حدد موقع الوجهة"
          value={destination}
          onOpen={onOpenDestination}
        />
      </div>
      <AdditionalDetails {...additionalDetails} />
    </div>
  );
}
