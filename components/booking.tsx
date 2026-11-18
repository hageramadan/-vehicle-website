"use client";

import { BookingHeader } from "./booking/booking-header";
import { VehicleSelection } from "./booking/vehicle-selection";
import { TripDetails } from "./booking/trip-details";
import { BookingReview } from "./booking/booking-review";
import { BookingConfirmation } from "./booking/booking-confirmation";
import { BookingNavigation } from "./booking/booking-navigation";
import { useState } from "react";
import { LocationPicker } from "./booking/location-picker";
import { useBooking } from "./booking/use-booking";

export type { Order } from "./booking/types";

export function Booking() {
  const booking = useBooking();
  const [locationTarget, setLocationTarget] = useState<
    "pickup" | "destination" | null
  >(null);
  if (locationTarget) {
    return (
      <main className="container mx-auto min-h-[650px] px-4 py-10 md:px-0">
        <LocationPicker
          key={locationTarget}
          target={locationTarget}
          value={
            locationTarget === "pickup" ? booking.pickup : booking.destination
          }
          initialPoint={
            locationTarget === "pickup"
              ? booking.pickupPoint
              : booking.destinationPoint
          }
          otherPoint={
            locationTarget === "pickup"
              ? booking.destinationPoint
              : booking.pickupPoint
          }
          onBack={() => setLocationTarget(null)}
          onConfirm={(value, point) => {
            if (locationTarget === "pickup") booking.setPickupPoint(point);
            else booking.setDestinationPoint(point);
            if (locationTarget === "pickup") booking.setPickup(value);
            else booking.setDestination(value);
            setLocationTarget(null);
          }}
        />
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-[calc(100svh-var(--site-header-height))] pb-8 pt-7 sm:pt-[60px]">
      <BookingHeader step={booking.step} />
      {booking.step === 0 && (
        <VehicleSelection
          selected={booking.selected}
          onSelect={booking.setSelected}
        />
      )}
      {booking.step === 1 && (
        <TripDetails
          vehicle={booking.vehicle}
          pickup={booking.pickup}
          destination={booking.destination}
          phone={booking.phone}
          notes={booking.notes}
          photo={booking.photo}
          accountPhone={booking.accountPhone}
          onOpenPickup={() => setLocationTarget("pickup")}
          onOpenDestination={() => setLocationTarget("destination")}
          onPhoneChange={booking.setPhone}
          onNotesChange={booking.setNotes}
          onPhotoChange={booking.setPhoto}
          onLocate={booking.locate}
          onChangeVehicle={booking.changeVehicle}
        />
      )}
      {booking.step === 2 && (
        <BookingReview
          vehicle={booking.vehicle}
          pickup={booking.pickup}
          destination={booking.destination}
          phone={booking.phone}
          notes={booking.notes}
          photos={booking.photo}
          pickupPoint={booking.pickupPoint}
          destinationPoint={booking.destinationPoint}
          onEditTrip={booking.editTrip}
          onEditVehicle={booking.changeVehicle}
          onConfirm={booking.next}
          submitting={booking.submitting}
        />
      )}
      {booking.step === 3 && <BookingConfirmation orderId={booking.orderId} />}
      {booking.error && (
        <p role="alert" className="mt-6 text-sm text-rose-400">
          {booking.error}
        </p>
      )}
      {booking.step !== 2 && (
        <BookingNavigation
          step={booking.step}
          onPrevious={booking.previous}
          onNext={booking.next}
        />
      )}
    </main>
  );
}
