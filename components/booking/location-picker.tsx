"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiCrosshair,
  FiChevronLeft,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";
import type { LocationPoint } from "./types";

const MapCanvas = dynamic(() => import("./map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center bg-white/5 text-sm sm:h-[550px]">
      جارٍ تحميل الخريطة...
    </div>
  ),
});
type LocationPickerProps = {
  target: "pickup" | "destination";
  value: string;
  initialPoint: LocationPoint | null;
  otherPoint: LocationPoint | null;
  onConfirm: (value: string, point: LocationPoint) => void;
  onBack: () => void;
};
type SearchResult = { lat: string; lon: string; display_name: string };
let lastSearch = 0;
const cache = new Map<string, SearchResult[]>();

export function LocationPicker({
  target,
  value,
  initialPoint,
  otherPoint,
  onConfirm,
  onBack,
}: LocationPickerProps) {
  const [point, setPoint] = useState<LocationPoint | null>(initialPoint);
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
    };
  }, []);
  const destination = target === "destination";
  function choose(next: LocationPoint) {
    setPoint(next);
    setQuery(next.label);
    setResults([]);
    setError("");
  }
  async function search(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim() || busy) return;
    if (Date.now() - lastSearch < 1100) {
      setError("انتظر لحظة قبل البحث مرة أخرى");
      return;
    }
    setError("");
    setResults([]);
    setBusy(true);
    lastSearch = Date.now();
    const request = new AbortController();
    controller.current = request;
    const timer = setTimeout(() => request.abort(), 10000);
    try {
      let found = cache.get(query.trim());
      if (!found) {
        const params = new URLSearchParams({
          q: query.trim(),
          format: "jsonv2",
          limit: "5",
          "accept-language": "ar",
        });
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params}`,
          { signal: request.signal },
        );
        if (!response.ok) throw new Error();
        found = (await response.json()) as SearchResult[];
        cache.set(query.trim(), found);
      }
      if (!mounted.current) return;
      setResults(found);
      if (!found.length)
        setError("لم نجد نتائج. جرّب عنوانًا آخر أو حدد نقطة على الخريطة.");
    } catch {
      if (mounted.current)
        setError(
          "تعذر البحث عن العنوان. يمكنك تحديد النقطة مباشرة على الخريطة.",
        );
    } finally {
      clearTimeout(timer);
      if (mounted.current) setBusy(false);
    }
  }
  function locate() {
    setError("");
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mounted.current) return;
        choose({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: `موقعي الحالي (${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)})`,
        });
        setLocating(false);
      },
      () => {
        if (!mounted.current) return;
        setLocating(false);
        setError("تعذر تحديد موقعك. اسمح بالوصول للموقع أو اختر النقطة يدويًا.");
      },
      { timeout: 10000 },
    );
  }
  return (
    <section aria-label={destination ? "اختيار الوجهة" : "اختيار الاستلام"}>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-sm text-slate-300"
      >
        <FiArrowRight />
        العودة لبيانات الرحلة
      </button>
      <form onSubmit={search} className="relative mb-7">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setResults([]);
            setPoint(null);
          }}
          aria-label="البحث عن عنوان"
          className="field min-h-[60px] pl-16"
          placeholder={destination ? "نقطة الوجهة" : "نقطة الاستلام"}
        />
        <button
          disabled={busy}
          type="submit"
          aria-label="بحث عن الموقع"
          className="absolute bottom-0 left-0 top-0 px-5 text-slate-300"
        >
          <FiSearch size={20} />
        </button>
        {results.length > 0 && (
          <ul
            aria-label="نتائج البحث"
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#202744] shadow-xl"
          >
            {results.map((result) => (
              <li key={`${result.lat}-${result.lon}`}>
                <button
                  type="button"
                  onClick={() =>
                    choose({
                      lat: Number(result.lat),
                      lng: Number(result.lon),
                      label: result.display_name,
                    })
                  }
                  className="w-full border-b border-white/10 p-4 text-right text-sm hover:bg-white/10"
                >
                  {result.display_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
      {busy && (
        <p role="status" className="mb-3 text-sm text-slate-300">
          جارٍ البحث...
        </p>
      )}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="relative isolate overflow-hidden rounded-xl">
          <MapCanvas
            point={point}
            otherPoint={otherPoint}
            destination={destination}
            onChange={choose}
            onError={setError}
          />
          <button
            type="button"
            onClick={locate}
            disabled={locating}
            className="absolute bottom-9 left-4 z-[1000] flex items-center gap-2 rounded-lg bg-primary/90 px-4 py-3 text-xs font-semibold text-white shadow-lg"
          >
            <FiCrosshair size={18} />
            {locating ? "جارٍ تحديد الموقع..." : "تحديد موقعي"}
          </button>
        </div>
        <div className="flex flex-wrap justify-between gap-4 px-2 py-5 text-xs text-[#a0a4bd]">
          <p className="flex min-w-0 items-center gap-2">
            <FiMapPin
              className={
                destination
                  ? "shrink-0 text-rose-400"
                  : "shrink-0 text-emerald-400"
              }
            />
            {destination ? "الوجهة" : "الاستلام"}:{" "}
            <span className="max-w-md truncate">
              {point?.label || "اضغط على الخريطة لتحديد النقطة"}
            </span>
          </p>
          <p>يمكنك سحب الدبوس لتعديل الموقع</p>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-rose-300">
          {error}
        </p>
      )}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          disabled={!point}
          onClick={() => point && onConfirm(point.label, point)}
          className="btn min-h-14 min-w-[240px]"
        >
          تأكيد النقطة <FiChevronLeft size={20} />
        </button>
      </div>
    </section>
  );
}
