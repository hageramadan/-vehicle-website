import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { readOrderPhotos } from "../order-photos-storage";
function PhotoPreview({ url, onClose }: { url: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label="معاينة صورة الطلب"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-32px)] max-w-4xl rounded-2xl border border-white/10 bg-primary p-4 text-white backdrop:bg-black/80"
    >
      <button
        type="button"
        aria-label="إغلاق الصورة"
        onClick={onClose}
        className="mb-3 rounded-full bg-white/10 p-2"
      >
        <FiX size={22} />
      </button>
      <img
        src={url}
        alt="صورة مرفقة مع الطلب"
        className="max-h-[75vh] w-full object-contain"
      />
    </dialog>
  );
}
export function OrderPhotos({ id, count }: { id: string; count?: number }) {
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    let disposed = false;
    let created: string[] = [];
    if (count)
      readOrderPhotos(id)
        .then((files) => {
          if (disposed) return;
          created = files.map((file) => URL.createObjectURL(file));
          setUrls(created);
          if (!files.length) setError("الصور غير متاحة في هذا المتصفح.");
        })
        .catch(() => {
          if (!disposed) setError("تعذر تحميل الصور المحفوظة.");
        });
    return () => {
      disposed = true;
      created.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [id, count]);
  if (!count) return null;
  return (
    <section
      aria-label="صور الطلب"
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <div className="flex flex-wrap gap-3">
        {urls.map((url, index) => (
          <button
            type="button"
            key={url}
            onClick={() => setPreview(url)}
            aria-label={`تكبير صورة الطلب ${index + 1}`}
            className="overflow-hidden rounded-xl border border-white/15 focus-visible:outline-2 focus-visible:outline-[#c4a34f]"
          >
            <img
              src={url}
              alt={`صورة الطلب ${index + 1}`}
              className="size-24 object-cover"
            />
          </button>
        ))}
      </div>
      {error && (
        <p role="status" className="text-xs text-rose-300">
          {error}
        </p>
      )}
      {!urls.length && !error && (
        <p role="status" className="text-xs text-[#969bb9]">
          جارٍ تحميل الصور...
        </p>
      )}
      {preview && (
        <PhotoPreview url={preview} onClose={() => setPreview(null)} />
      )}
    </section>
  );
}
