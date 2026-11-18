"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { LocationPoint } from "./types";

const MapCanvas = dynamic(() => import("./map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center bg-white/5 text-sm text-[#969bb9]">
      جارٍ تحميل الخريطة...
    </div>
  ),
});

type ReviewTripProps = {
  pickup: string;
  destination: string;
  pickupPoint: LocationPoint | null;
  destinationPoint: LocationPoint | null;
  onEdit?: () => void;
  title?: string;
};

export function ReviewTrip({
  pickup,
  destination,
  pickupPoint,
  destinationPoint,
  onEdit,
  title = "تفاصيل الرحلة",
}: ReviewTripProps) {
  const [error, setError] = useState("");
  return (
    <section className="rounded-2xl border border-white/10 min-w-0 bg-white/5 p-4 sm:p-6 lg:p-7">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#dfe0ec]">{title}</h2>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-sm font-bold text-[#c4a34f]"
          >
            تعديل
          </button>
        )}
      </div>
      <div className="isolate overflow-hidden rounded-xl border border-white/10">
        <MapCanvas
          point={destinationPoint}
          otherPoint={pickupPoint}
          destination
          editable={false}
          onError={setError}
          className="h-[260px] w-full bg-[#e8e9ec] lg:h-[330px]"
        />
      </div>
      {error && (
        <p role="status" className="mt-3 text-xs text-rose-300">
          {error}
        </p>
      )}
      <dl className="mt-5 grid gap-4 min-[400px]:grid-cols-2 sm:gap-5 text-sm">
        <div className="min-w-0">
          <dt className="mb-2 flex items-center gap-2 text-xs text-[#969bb9]">
            <span className="size-2 rounded-full bg-[#25bf89]" />
            موقع الاستلام
          </dt>
          <dd className="break-words leading-7 text-[#c4c9de]">
            {pickup || "لم يتم تحديد موقع الاستلام"}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="mb-2 flex items-center gap-2 text-xs text-[#969bb9]">
            <span className="size-2 rounded-full bg-white" />
            موقع الوجهة
          </dt>
          <dd className="break-words leading-7 text-[#c4c9de]">
            {destination || "لم يتم تحديد موقع الوجهة"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
