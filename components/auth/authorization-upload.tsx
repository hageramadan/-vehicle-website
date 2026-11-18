"use client";
import { useEffect, useId, useState } from "react";
import { FiUpload, FiTrash2, FiFileText } from "react-icons/fi";
export function AuthorizationUpload({
  file,
  error,
  onChange,
}: {
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}) {
  const id = useId();
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file || !/^image\/(jpeg|png)$/.test(file.type)) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return (
    <div>
      <label
        htmlFor={file ? undefined : id}
        className="mb-2 block text-sm font-bold text-[#c8ccdc]"
      >
        صورة خطاب التفويض <span className="text-[#e06779]">*</span>
      </label>
      {file ? (
        <div
          className={`flex min-h-[58px] items-center gap-3 rounded-xl border bg-white/5 p-1.5 pl-4 ${error ? "border-[#e06779]" : "border-white/15"}`}
        >
          {preview ? (
            <img
              src={preview}
              alt="معاينة خطاب التفويض"
              className="size-12 shrink-0 rounded-lg border border-white/15 object-cover"
            />
          ) : (
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#c4a34f]">
              <FiFileText size={26} />
            </span>
          )}
          <span
            className="min-w-0 flex-1 truncate text-sm font-semibold text-[#9399b2]"
            title={file.name}
          >
            {file.name}
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="حذف ملف خطاب التفويض"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#ff535d] hover:bg-red-400/10 focus-visible:outline-2 focus-visible:outline-red-400"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      ) : (
        <label
          className={`relative flex min-h-14 cursor-pointer items-center gap-4 rounded-xl border bg-white/5 px-4 py-2 focus-within:outline-2 focus-within:outline-[#c4a34f] ${error ? "border-[#e06779]" : "border-white/15"}`}
        >
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#9399b2]">
            بحد أقصى 5 ميجابايت — PDF، JPG أو PNG
          </span>
          <span className="flex shrink-0 flex-col items-center gap-1 text-[#c4a34f]">
            <FiUpload size={20} />
            <span className="text-[9px] text-[#969bb9]">اختر الملف</span>
          </span>
          <input
            id={id}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="sr-only"
            onChange={(event) => {
              onChange(event.target.files?.[0] || null);
              event.target.value = "";
            }}
          />
        </label>
      )}
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
