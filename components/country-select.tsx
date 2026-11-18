"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { phoneCountries } from "./phone-utils";

type Country = (typeof phoneCountries)[number];
type CountrySelectProps = {
  value: Country;
  onChange: (country: Country) => void;
};

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    options.current[
      phoneCountries.findIndex((country) => country.iso === value.iso)
    ]?.focus();
    function closeOutside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open, value.iso]);

  function choose(country: Country) {
    onChange(country);
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <div
      ref={root}
      className="relative shrink-0 border-r border-white/10 pr-3"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={`الدولة ورمز الاتصال: ${value.name} +${value.dial}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={id}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex items-center gap-2 rounded-lg py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a34f] ${open ? "text-[#d5b76a]" : "text-[#adb2ca] hover:text-white"}`}
      >
        <img
          src={`/images/flags/${value.iso}.svg`}
          alt=""
          width={26}
          height={19}
          className="h-[19px] w-[26px] rounded object-cover"
        />
        <span dir="ltr">+{value.dial}</span>
        <FiChevronDown
          size={15}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-3 w-[250px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-white/15 bg-[#1d2549] shadow-[0_18px_45px_#06091f80]"
          dir="rtl"
        >
          <ul
            id={id}
            role="listbox"
            aria-label="الدولة ورمز الاتصال"
            className="max-h-72 overflow-y-auto p-2 [scrollbar-color:#444d73_transparent] [scrollbar-width:thin]"
          >
            {phoneCountries.map((country, index) => {
              const selected = value.iso === country.iso;
              return (
                <li key={country.iso} role="presentation">
                  <button
                    ref={(element) => {
                      options.current[index] = element;
                    }}
                    role="option"
                    aria-selected={selected}
                    type="button"
                    tabIndex={-1}
                    onClick={() => choose(country)}
                    onKeyDown={(event) => {
                      let next = index;
                      if (event.key === "ArrowDown")
                        next = (index + 1) % phoneCountries.length;
                      else if (event.key === "ArrowUp")
                        next =
                          (index + phoneCountries.length - 1) %
                          phoneCountries.length;
                      else if (event.key === "Home") next = 0;
                      else if (event.key === "End")
                        next = phoneCountries.length - 1;
                      else if (event.key === "Escape") {
                        event.preventDefault();
                        setOpen(false);
                        trigger.current?.focus();
                        return;
                      } else return;
                      event.preventDefault();
                      options.current[next]?.focus();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10 ${selected ? "bg-[#8b2538]/25 text-white" : "text-[#c6cbe0]"}`}
                  >
                    <img
                      src={`/images/flags/${country.iso}.svg`}
                      alt=""
                      width={26}
                      height={19}
                      className="h-[19px] w-[26px] rounded object-cover"
                    />
                    <span className="flex-1 font-semibold">{country.name}</span>
                    <span dir="ltr" className="text-xs text-[#aeb5d0]">
                      +{country.dial}
                    </span>
                    <span className="w-4 text-[#d5b76a]">
                      {selected && <FiCheck aria-hidden="true" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

