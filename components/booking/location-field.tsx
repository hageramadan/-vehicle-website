import { FiSearch, FiCrosshair } from "react-icons/fi";

type LocationFieldProps = {
  number: number;
  label: string;
  subtitle: string;
  searchLabel: string;
  placeholder: string;
  value: string;
  onOpen: () => void;
  onLocate?: () => void;
};

export function LocationField({
  number,
  label,
  subtitle,
  searchLabel,
  placeholder,
  value,
  onOpen,
  onLocate,
}: LocationFieldProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-[30px]">
      <div className="mb-7 flex items-center gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#74172e] text-sm">
          {number}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[#dfe0ec]">{label}</h2>
          <p className="mt-1 text-xs text-[#969bb9]">{subtitle}</p>
        </div>
      </div>
      <p className="mb-2 text-sm font-bold text-[#b8bdd2]">{searchLabel}</p>
      <button
        type="button"
        onClick={onOpen}
        className="flex min-h-[60px] w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-5 text-right text-sm font-bold text-[#dfe0ec] focus-visible:outline-2 focus-visible:outline-[#c4a34f]"
      >
        <span className="min-w-0 truncate">{value || placeholder}</span>
        <FiSearch className="shrink-0" size={21} />
      </button>
      {onLocate && (
        <button
          type="button"
          onClick={onLocate}
          className="mr-auto mt-4 flex items-center gap-2 text-sm font-bold text-[#c4a34f]"
        >
          <FiCrosshair size={22} />
          استخدام موقعي الحالي
        </button>
      )}
    </section>
  );
}
