"use client";
import { useState } from "react";
import { PasswordField } from "./password-field";
import { AuthFooter } from "./auth-footer";
import { passwordError } from "./validation";
export function NewPasswordForm({ onSaved }: { onSaved: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    const next = {
      password: passwordError(password),
      confirm:
        password === data.get("confirm") ? "" : "كلمتا المرور غير متطابقتين",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    onSaved();
  }
  return (
    <section className="min-w-0 px-4 pb-8 pt-8 sm:px-12 sm:pb-14 sm:pt-12 md:pb-24 md:pt-[72px] lg:px-16">
      <h1 className="text-[30px] font-extrabold leading-[1.6] text-white lg:text-[40px]">
        كلمة مرور جديدة
      </h1>
      <p className="mt-2 text-sm leading-8 text-[#a0a5bd] lg:text-xl">
        أنشئ كلمة مرور جديدة لحسابك
      </p>
      <form noValidate onSubmit={submit} className="mt-9 space-y-5">
        <PasswordField
          name="password"
          label="كلمة المرور الجديدة"
          placeholder="أدخل كلمة المرور الجديدة"
          error={errors.password}
        />
        <PasswordField
          name="confirm"
          label="تأكيد كلمة المرور الجديدة"
          placeholder="أعد إدخال كلمة المرور الجديدة"
          error={errors.confirm}
        />
        <button type="submit" className="btn min-h-14 w-full text-base">
          حفظ كلمة المرور الجديدة
        </button>
      </form>
      <AuthFooter />
    </section>
  );
}
