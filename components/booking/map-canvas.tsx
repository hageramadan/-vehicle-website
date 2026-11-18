"use client";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import type { LocationPoint } from "./types";

type MapCanvasProps = {
  point: LocationPoint | null;
  otherPoint: LocationPoint | null;
  destination: boolean;
  onChange?: (point: LocationPoint) => void;
  editable?: boolean;
  className?: string;
  onError: (message: string) => void;
};

export default function MapCanvas({
  point,
  otherPoint,
  destination,
  onChange,
  onError,
  editable = true,
  className = "h-[350px] w-full bg-[#e8e9ec] sm:h-[550px]",
}: MapCanvasProps) {
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const initial = useRef(point || otherPoint);
  const callbacks = useRef({ onChange, onError });
  callbacks.current = { onChange, onError };
  useEffect(() => {
    if (!container.current) return;
    const start = initial.current;
    const instance = L.map(container.current).setView(
      start ? [start.lat, start.lng] : [24.7136, 46.6753],
      start ? 15 : 12,
    );
    L.tileLayer(
      process.env.NEXT_PUBLIC_MAP_TILE_URL ||
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    )
      .on("tileerror", () =>
        callbacks.current.onError(
          "تعذر تحميل بعض أجزاء الخريطة. تحقق من اتصال الإنترنت.",
        ),
      )
      .addTo(instance);
    instance.on("click", (event) =>
      callbacks.current.onChange?.({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        label: `${event.latlng.lat.toFixed(5)}, ${event.latlng.lng.toFixed(5)}`,
      }),
    );
    setMap(instance);
    const observer = new ResizeObserver(() => instance.invalidateSize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      instance.remove();
    };
  }, []);
  useEffect(() => {
    if (!map) return;
    const markers: L.Marker[] = [];
    function add(location: LocationPoint, color: string, active: boolean) {
      const marker = L.marker([location.lat, location.lng], {
        draggable: active && editable,
        keyboard: true,
        title: active ? "النقطة المختارة" : "النقطة الأخرى",
        icon: L.divIcon({
          className: "",
          html: `<span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 2px 8px #0004;color:white;font-size:20px">●</span>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        }),
      }).addTo(map!);
      marker.bindTooltip(active ? "النقطة المختارة" : "النقطة الأخرى");
      if (active && editable)
        marker.on("dragend", () => {
          const p = marker.getLatLng();
          callbacks.current.onChange?.({
            lat: p.lat,
            lng: p.lng,
            label: `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`,
          });
        });
      markers.push(marker);
    }
    if (otherPoint) add(otherPoint, destination ? "#25bf89" : "#8b2538", false);
    if (point) {
      add(point, destination ? "#8b2538" : "#25bf89", true);
      if (!editable && otherPoint) {
        map.fitBounds(
          [
            [point.lat, point.lng],
            [otherPoint.lat, otherPoint.lng],
          ],
          { padding: [35, 35], maxZoom: 15 },
        );
      } else map.setView([point.lat, point.lng], Math.max(map.getZoom(), 15));
    }
    return () => markers.forEach((marker) => marker.remove());
  }, [map, point, otherPoint, destination, editable]);
  return (
    <div
      ref={container}
      role="region"
      aria-label={
        editable ? "خريطة اختيار الموقع، اضغط لتحديد نقطة" : "خريطة ملخص الرحلة"
      }
      className={className}
      dir="ltr"
    />
  );
}
