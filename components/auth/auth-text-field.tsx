import { useId, type ReactNode } from "react";

type AuthTextFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  icon?: ReactNode;
  inputMode?: "text" | "numeric" | "email";
};
export function AuthTextField({
  name,
  label,
  type = "text",
  placeholder,
  error,
  autoComplete,
  defaultValue,
  required = true,
  icon,
  inputMode,
}: AuthTextFieldProps) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-[#c8ccdc]"
      >
        {label} {required && <span className="text-[#e06779]">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          defaultValue={defaultValue}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder || label}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-14 w-full rounded-xl border py-3 pr-4 text-sm font-semibold text-[#dfe0ec] placeholder:text-[#9399b2] ${icon ? "pl-12" : "pl-4"} ${error ? "border-[#e06779] bg-[#e06779]/5" : "border-white/15 bg-white/5"}`}
        />
        {icon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-xl text-[#dfe0ec]"
          >
            {icon}
          </span>
        )}
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
