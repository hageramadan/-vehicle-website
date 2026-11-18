import { PhoneInput } from "../phone-input";
import { PhoneNumber } from "../phone-number";
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import type { Vehicle } from "./types";
import { PhotoUpload } from "./photo-upload";

type AdditionalDetailsProps = {
  vehicle: Vehicle;
  phone: string;
  notes: string;
  photo: File[];
  accountPhone: string;
  onPhoneChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onPhotoChange: (value: File[]) => void;
  onChangeVehicle: () => void;
};

export function AdditionalDetails({
  vehicle,
  phone,
  notes,
  photo,
  accountPhone,
  onPhoneChange,
  onNotesChange,
  onPhotoChange,
  onChangeVehicle,
}: AdditionalDetailsProps) {
  const [contact, setContact] = useState<"account" | "other">(
    accountPhone && phone === accountPhone ? "account" : "other",
  );
  return (
    <section className="rounded-2xl border border-white/10 min-w-0 bg-white/5 p-4 sm:p-6 lg:p-[30px]">
      <div className="mb-7 flex items-center gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#74172e] text-sm">
          3
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[#dfe0ec]">
            بيانات إضافية
          </h2>
          <p className="mt-1 text-xs text-[#969bb9]">تفاصيل تساعدنا في خدمتك</p>
        </div>
      </div>
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="h-16 w-20 shrink-0 sm:h-[74px] sm:w-[98px] rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-[#969bb9]">نوع السطحة</p>
          <b className="mt-1 block text-sm">{vehicle.name}</b>
        </div>
        <button
          type="button"
          className="text-xs font-bold text-[#c4a34f] underline"
          onClick={onChangeVehicle}
        >
          تغيير
        </button>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-[#b8bdd2]">
          رقم التواصل
        </legend>
        <div className="grid gap-2 min-[400px]:grid-cols-2">
          {(
            [
              ["account", "رقم الهاتف المسجل"],
              ["other", "رقم آخر"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-[58px] cursor-pointer items-center gap-2 rounded-xl border px-3 text-xs ${contact === value ? "border-[#a72a43] bg-white/5" : "border-white/10 bg-white/5"}`}
            >
              <FiPhone className="shrink-0" size={18} />
              <span className="min-w-0 flex-1">
                {label}
                {value === "account" && accountPhone && (
                  <span
                    dir="ltr"
                    className="mt-1 block text-[10px] text-[#969bb9]"
                  >
                    <PhoneNumber value={accountPhone} />
                  </span>
                )}
              </span>
              <input
                type="radio"
                name="contact-number"
                value={value}
                checked={contact === value}
                onChange={() => {
                  setContact(value);
                  onPhoneChange(value === "account" ? accountPhone : "");
                }}
                className="size-4 accent-[#8b2538]"
              />
            </label>
          ))}
        </div>
      </fieldset>
      {(contact === "other" || !accountPhone) && (
        <div className="mt-3 block text-xs text-[#b8bdd2]">
          {contact === "account"
            ? "أدخل رقم جوالك المسجل"
            : "رقم التواصل الآخر"}
          <PhoneInput
            value={phone}
            onChange={onPhoneChange}
            label="رقم التواصل"
          />
        </div>
      )}
      <label className="mt-5 block text-sm font-bold text-[#b8bdd2]">
        تفاصيل الطلب{" "}
        <span className="mr-1 font-normal text-[#969bb9]">(اختياري)</span>
        <textarea
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          className="mt-2 h-[120px] w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#dfe0ec] placeholder:text-[#8a90ad]"
          placeholder="مثال: السيارة لا تعمل، الموقع داخل مواقف..."
        />
      </label>
      <PhotoUpload files={photo} onChange={onPhotoChange} />
    </section>
  );
}
