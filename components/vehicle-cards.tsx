"use client";

import Link from "next/link";
import { FiCheck, FiChevronLeft } from "react-icons/fi";

export const vehicles = [
  {
    id: "standard",
    name: "سطحة عادية",
    description: "لنقل المركبات داخل المدينة",
    price: 185,
    image: "/images/vehicles/standard.jpg",
  },
  {
    id: "hydraulic",
    name: "سطحة هيدروليك",
    description: "للسيارات المنخفضة والفاخرة",
    price: 230,
    image: "/images/vehicles/hydraulic.jpg",
  },
  {
    id: "rescue",
    name: "سطحة إنقاذ",
    description: "للحالات الطارئة والحوادث",
    price: 310,
    image: "/images/vehicles/rescue.jpg",
  },
];

export function VehicleCards({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div
      className="motion-stagger grid w-full items-stretch gap-6 md:grid-cols-3 lg:gap-[31.92px]"
      role={onSelect ? "group" : undefined}
      aria-label="نوع السطحة"
    >
      {vehicles.map((vehicle, index) => {
        const isSelected = selected === vehicle.id;
        return (
          <article
            key={vehicle.id}
            className={`motion-card relative flex h-full min-w-0 w-full flex-col overflow-hidden rounded-[21.62px] border-[2.66px] bg-white/5 backdrop-blur-[53.21px] transition-[border-color,box-shadow] md:h-[502.37px] ${isSelected ? "border-[#8b2538] shadow-[0_18px_38px_-15px_#801b3a66]" : "border-[#ffffff14]"}`}
          >
            <div className="relative aspect-[403.52/318] shrink-0 overflow-hidden md:aspect-auto md:h-[318px]">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-full w-full object-cover"
              />
              {index === 0 && (
                <span className="absolute right-4 top-4 rounded-full bg-[#25bf89] px-3 py-1 text-[11px] font-bold leading-5 text-white">
                  الأكثر طلبًا
                </span>
              )}
              {isSelected && (
                <span className="absolute left-4 top-4 flex size-8 items-center justify-center rounded-full bg-[#741c35] text-white">
                  <FiCheck size={19} aria-hidden="true" />
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col items-start px-6 pb-6 pt-[18px] text-right">
              <h3 className="text-xl font-semibold leading-9 text-[#dfe0ec] lg:text-2xl">
                {vehicle.name}
              </h3>
              <p className="mt-0.5 text-sm font-semibold leading-7 text-[#9398b6] lg:text-base">
                {vehicle.description}
              </p>
              <span
                aria-hidden="true"
                className="mt-5 flex items-center gap-2 text-sm font-bold leading-6 text-[#bc9b45] md:mt-auto"
              >
                اختيار السطحة <FiChevronLeft size={18} />
              </span>
              {onSelect ? (
                <button
                  type="button"
                  aria-label={`اختيار ${vehicle.name}`}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(vehicle.id)}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#bc9b45]"
                />
              ) : (
                <Link
                  href={`/booking?vehicle=${vehicle.id}`}
                  aria-label={`اختيار ${vehicle.name}`}
                  className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#bc9b45]"
                />
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
