import type { OrderFilter } from "./order-status";
const filters: { id: OrderFilter; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "pending", label: "الجديدة" },
  { id: "active", label: "الحالية" },
  { id: "completed", label: "المنتهية" },
];
export function OrdersFilters({
  value,
  onChange,
}: {
  value: OrderFilter;
  onChange: (value: OrderFilter) => void;
}) {
  return (
    <div
      role="group"
      aria-label="تصفية الطلبات"
      className="mb-8 mt-12 flex flex-wrap gap-3"
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={filter.id === value}
          onClick={() => onChange(filter.id)}
          className={`min-w-[74px] rounded-full border px-5 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a34f] ${value === filter.id ? "border-[#8b2538] bg-[#67152b] text-[#f0d9df]" : "border-white/5 bg-white/5 text-[#969bb9] hover:bg-white/10"}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
