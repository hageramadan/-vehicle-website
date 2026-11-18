"use client";
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { phoneDigits } from "../phone-utils";
import { PhoneNumber } from "../phone-number";
import { AuthFooter } from "./auth-footer";
import { DEMO_CODE } from "./validation";

export function CodeVerification({
  phone,
  onConfirm,
  onEditPhone,
}: {
  phone: string;
  onConfirm: () => void;
  onEditPhone: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (code !== DEMO_CODE) {
      setError(`أدخل رمز التأكيد الصحيح المكون من 4 أرقام`);
      return;
    }
    onConfirm();
  }
  return (
    <section className="min-w-0 px-6 pb-14 pt-12 sm:px-12 md:pb-24 md:pt-[72px] lg:px-16">
      <h1 className="text-[30px] font-extrabold leading-[1.6] text-white lg:text-[40px]">
        رمز التأكيد
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm leading-8 text-[#a0a5bd]">
        <span>أدخل رمز التأكيد للرقم</span>
        <PhoneNumber value={phone} />
      </div>
      <form noValidate onSubmit={submit} className="mt-9">
        <label
          htmlFor="confirmation-code"
          className="mb-2 block text-sm font-bold text-[#c8ccdc]"
        >
          رمز التأكيد <span className="text-[#e06779]">*</span>
        </label>
        <div className="relative">
          <input
            id="confirmation-code"
            value={code}
            onChange={(event) => {
              setCode(
                phoneDigits(event.target.value).replace(/\+/g, "").slice(0, 4),
              );
              setError("");
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "confirmation-code-error" : "confirmation-code-hint"
            }
            className={`min-h-[56px] w-full rounded-xl border py-3 pl-14 pr-4 text-right text-sm font-semibold text-[#dfe0ec] placeholder:text-[#9399b2] ${error ? "border-[#e06779] bg-[#e06779]/5" : "border-white/15 bg-white/5"}`}
            placeholder="أدخل الرمز المكون من 4 أرقام"
          />
          <FiLock
            className="absolute left-4 top-[18px] text-[#dfe0ec]"
            size={20}
          />
        </div>
        {error && (
          <p
            id="confirmation-code-error"
            role="alert"
            className="mt-2 text-xs font-semibold leading-6 text-[#ef5965]"
          >
            {error}
          </p>
        )}
        <p
          id="confirmation-code-hint"
          className="mt-3 text-[11px] leading-6 text-[#969bb9]"
        >
          رمز المعاينة: {DEMO_CODE} — لم تُرسل رسالة فعلية.
        </p>
        <button className="btn mt-5 min-h-14 w-full text-base" type="submit">
          التالي
        </button>
      </form>
      <button
        type="button"
        onClick={onEditPhone}
        className="mx-auto mt-6 block text-sm font-bold text-[#c4a34f]"
      >
        تعديل رقم الجوال
      </button>
      <AuthFooter />
    </section>
  );
}
