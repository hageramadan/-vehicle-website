"use client";
import { useState } from "react";
import { PhoneInput } from "../phone-input";
import { normalizePhone } from "../phone-utils";
import { AuthFooter } from "./auth-footer";
import { CodeVerification } from "./code-verification";
import { NewPasswordForm } from "./new-password-form";
import { PasswordUpdated } from "./password-updated";
import { phoneError } from "./validation";
export function ForgotPasswordForm() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = phoneError(phone);
    setError(next);
    if (next) return;
    setPhone(normalizePhone(phone));
    setStep(1);
  }
  if (step === 1)
    return (
      <CodeVerification
        phone={phone}
        onEditPhone={() => {
          setStep(0);
          setError("");
        }}
        onConfirm={() => setStep(2)}
      />
    );
  if (step === 2) return <NewPasswordForm onSaved={() => setStep(3)} />;
  if (step === 3) return <PasswordUpdated />;
  return (
    <section className="min-w-0 px-4 pb-8 pt-8 sm:px-12 sm:pb-14 sm:pt-12 md:pb-24 md:pt-[72px] lg:px-16">
      <h1 className="text-[30px] font-extrabold leading-[1.6] text-white lg:text-[40px]">
        نسيت كلمة المرور
      </h1>
      <p className="mt-2 text-sm leading-8 text-[#a0a5bd] lg:text-xl">
        أدخل رقم الجوال المسجل في حسابك لبدء استعادة كلمة المرور
      </p>
      <form noValidate onSubmit={submit} className="mt-9">
        <div>
          <p className="mb-2 text-base font-bold text-[#c8ccdc]">
            رقم الجوال <span className="text-[#e06779]">*</span>
          </p>
          <PhoneInput
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setError("");
            }}
            error={error}
            required
          />
        </div>
        <p className="mt-5 rounded-xl border border-[#c4a34f]/15 bg-white/5 px-5 py-4 text-xs leading-7 text-[#a0a5bd]">
          سنستخدم رقم الجوال المسجل للتحقق من الحساب ومتابعة خطوات الاستعادة
        </p>
        <button type="submit" className="btn mt-5 min-h-14 w-full text-base">
          التالي
        </button>
      </form>
      <AuthFooter />
    </section>
  );
}
