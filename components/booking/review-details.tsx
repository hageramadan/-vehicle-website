"use client";
import { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { PhoneNumber } from "../phone-number";

export function ReviewDetails({
  notes,
  phone,
  photos,
}: {
  notes: string;
  phone: string;
  photos: File[];
}) {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    const next = photos.map((photo) => URL.createObjectURL(photo));
    setUrls(next);
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [photos]);
  return (
    <section className="rounded-2xl border border-white/10 min-w-0 bg-white/5 p-4 sm:p-6 lg:p-7">
      <h2 className="text-lg font-semibold text-[#dfe0ec]">تفاصيل إضافية</h2>
      <p className="mt-4 break-words text-sm leading-7 text-[#a0a5c0]">
        {notes || "لم تتم إضافة تفاصيل إضافية"}
      </p>
      {phone && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-[#969bb9]">رقم التواصل</span>
          <PhoneNumber value={phone} />
        </div>
      )}
      {urls.length ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {urls.map((url, index) => (
            <img
              key={url}
              src={url}
              alt={`صورة المركبة أو الموقع ${index + 1}`}
              className="aspect-square w-full rounded-xl object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex min-h-[90px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-[#969bb9]">
          <FiCamera size={24} />
          <span>لم تتم إضافة صور</span>
        </div>
      )}
    </section>
  );
}
