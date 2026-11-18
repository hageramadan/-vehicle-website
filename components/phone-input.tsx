"use client";
import { useId, useState } from "react";
import { CountrySelect } from "./country-select";
import { FiPhone } from "react-icons/fi";
import { phoneCountries, phoneDigits, splitPhone } from "./phone-utils";

type PhoneInputProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  label?: string;
  className?: string;
  error?: string;
};
export function PhoneInput({
  name,
  value,
  onChange,
  required,
  label = "رقم الجوال",
  className = "",
  error,
}: PhoneInputProps) {
  const errorId = useId();
  const [internalValue, setInternalValue] = useState("");
  const [countryIso, setCountryIso] = useState<string>("sa");
  const current = value ?? internalValue;
  const parsed = splitPhone(current);
  const country = current.startsWith("+")
    ? parsed.country
    : phoneCountries.find((item) => item.iso === countryIso) ||
      phoneCountries[0];
  const national = current.startsWith("+")
    ? parsed.national
    : phoneDigits(current);
  function update(dial: string, number: string) {
    const next = number ? `+${dial}${number}` : "";
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }
  return (
    <>
      <div
        dir="ltr"
        className={`mt-2 flex min-h-[58px] w-full items-center gap-2 rounded-xl border px-3 sm:gap-3 sm:px-4 ${error ? "border-[#e06779] bg-[#e06779]/5 focus-within:border-[#e06779]" : "border-white/15 bg-white/5 focus-within:border-[#c4a34f]"} ${className}`}
      >
        <CountrySelect
          value={country}
          onChange={(next) => {
            setCountryIso(next.iso);
            update(next.dial, national);
          }}
        />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          aria-label={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          required={required}
          value={national}
          onChange={(event) =>
            update(
              country.dial,
              phoneDigits(event.target.value).replace(/\+/g, ""),
            )
          }
          placeholder={country.placeholder}
          className="min-w-0 flex-1 bg-transparent py-4 text-left text-base font-semibold text-[#dfe0ec] placeholder:text-[#8a90ad]"
        />
        <FiPhone
          size={22}
          className="shrink-0 text-[#dfe0ec]"
          aria-hidden="true"
        />
        {name && <input type="hidden" name={name} value={current} />}
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-right text-xs font-semibold leading-6 text-[#ef5965]"
        >
          {error}
        </p>
      )}
    </>
  );
}
