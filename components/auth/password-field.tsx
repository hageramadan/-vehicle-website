"use client";
import { useId, useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";

type PasswordFieldProps = {
  name: string;
  label: string;
  error?: string;
  autoComplete?: "current-password" | "new-password";
  placeholder?: string;
  onChange?: () => void;
};
export function PasswordField({
  name,
  label,
  error,
  autoComplete = "new-password",
  placeholder = "أدخل كلمة المرور",
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-[#c8ccdc]"
      >
        {label} <span className="text-[#e06779]">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={onChange}
          className={`min-h-[56px] w-full rounded-xl border py-3 pl-14 pr-4 text-sm font-semibold text-[#dfe0ec] placeholder:text-[#9399b2] ${error ? "border-[#e06779] bg-[#e06779]/5" : "border-white/15 bg-white/5"}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-l-xl text-[#dfe0ec] focus-visible:outline-2 focus-visible:outline-[#c4a34f]"
        >
          {visible ? <FiUnlock size={21} /> : <FiLock size={21} />}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs font-semibold leading-6 text-[#ef5965]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
