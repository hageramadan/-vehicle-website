"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneInput } from "../phone-input";
import { normalizePhone } from "../phone-utils";
import { PasswordField } from "./password-field";
import { passwordError, phoneError } from "./validation";

export function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const next = {
      phone: phoneError(phone),
      password: passwordError(String(values.get("password") || "")),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    try {
      sessionStorage.setItem("vehicle-demo-phone", normalizePhone(phone));
      sessionStorage.setItem("vehicle-demo-user", "عميلنا");
      setBusy(true);
      router.push("/booking");
    } catch {
      setErrors({
        form: "تعذر إكمال الدخول التجريبي. تحقق من إتاحة التخزين في المتصفح.",
      });
    }
  }
  return (
    <section className="min-w-0 px-6 pb-14 pt-12 sm:px-12 md:pb-24 md:pt-[72px] lg:px-16">
      <h1 className="text-[30px] font-extrabold leading-[1.6] text-white lg:text-[40px]">
        مرحبًا بعودتك
      </h1>
      <p className="mt-2 text-sm leading-8 text-[#a0a5bd] lg:text-xl">
        سجّل دخولك لطلب سطحة أو متابعة طلباتك
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
              setErrors((current) => ({ ...current, phone: "" }));
            }}
            error={errors.phone}
            required
          />
        </div>
        <div className="mt-6">
          <PasswordField
            name="password"
            label="كلمة المرور"
            autoComplete="current-password"
            error={errors.password}
            onChange={() =>
              setErrors((current) => ({ ...current, password: "" }))
            }
          />
          <Link
            href="/forgot-password"
            className="mt-2 lg:mt-3 block w-fit mr-auto text-sm lg:text-base font-bold leading-6 text-[#C9A961]"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
        {errors.form && (
          <p role="alert" className="mt-4 text-xs leading-6 text-[#ef5965]">
            {errors.form}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="btn mt-5 min-h-14 w-full text-base"
        >
          {busy ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
      <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm lg:text-base leading-7 text-[#969bb9]">
        ليس لديك حساب؟{" "}
        <Link href="/signup" className="font-bold text-[#c4a34f]">
          أنشئ حسابًا جديدًا
        </Link>
      </p>
    </section>
  );
}
