"use client";
import { useEffect, useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
export function PhotoUpload({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);
  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list);
    if (files.length + next.length > 4) {
      setError("يمكنك إضافة 4 صور بحد أقصى");
      return;
    }
    if (
      next.some(
        (file) =>
          !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024,
      )
    ) {
      setError("اختر صورًا بحجم لا يزيد عن 10 ميجابايت للصورة");
      return;
    }
    setError("");
    onChange([...files, ...next]);
  }
  function remove(index: number) {
    setError("");
    onChange(files.filter((_, i) => i !== index));
  }
  return (
    <div className="mt-5">
      <div className="flex min-h-[96px] flex-wrap items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/[.025] p-4">
        {files.length ? (
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {files.map((file, index) => (
              <div
                className="relative shrink-0"
                key={`${file.name}-${file.lastModified}-${index}`}
              >
                {previews[index] && (
                  <img
                    src={previews[index]}
                    alt={`صورة مرفقة ${index + 1}`}
                    className="size-14 rounded-lg border border-white/20 object-cover sm:size-16"
                  />
                )}
                <button
                  type="button"
                  aria-label={`حذف الصورة ${index + 1}`}
                  onClick={() => remove(index)}
                  className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full border border-[#f6c4b0] bg-white text-[#e98166] shadow-sm focus-visible:outline-2 focus-visible:outline-[#c4a34f]"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <FiCamera className="shrink-0 text-[#dfe0ec]" size={24} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">أرفق صور المركبة أو الموقع</p>
              <p className="mt-1 text-xs text-[#969bb9]">
                يمكنك إضافة حتى 4 صور
              </p>
            </div>
          </>
        )}
        <button
          type="button"
          disabled={files.length >= 4}
          onClick={() => input.current?.click()}
          className="mr-auto shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-[#c4a34f]"
        >
          إضافة صور
        </button>
        <input
          ref={input}
          type="file"
          multiple
          accept="image/*"
          aria-label="إضافة صور المركبة أو الموقع"
          className="sr-only"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
