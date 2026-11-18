import { useEffect, useRef } from "react";
import { FiClock } from "react-icons/fi";
export function CancelOrderDialog({
  id,
  error,
  onKeep,
  onConfirm,
}: {
  id: string;
  error: string;
  onKeep: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="cancel-order-title"
      onCancel={(event) => {
        event.preventDefault();
        onKeep();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onKeep();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-[720px] rounded-[26px] border border-white/10 bg-linear-to-br from-[#1c2553] to-[#111633] p-0 text-white shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="px-6 py-10 text-center sm:px-12"
      >
        <span className="mx-auto flex size-24 items-center justify-center rounded-full bg-[#8b2538]/20 text-[#ee8495]">
          <FiClock size={36} />
        </span>
        <h2
          id="cancel-order-title"
          className="mt-7 text-2xl font-extrabold sm:text-3xl"
        >
          تأكيد إلغاء الطلب
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#a0a5bd]">
          أنت على وشك إلغاء الطلب رقم{" "}
          <b dir="ltr" className="text-[#dfe0ec]">
            {id}
          </b>
          . هل تريد المتابعة؟
        </p>
        {error && (
          <p role="alert" className="mt-3 text-xs text-rose-300">
            {error}
          </p>
        )}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            autoFocus
            type="button"
            onClick={onKeep}
            className="min-h-14 rounded-full border border-white/30 bg-white/5 px-5 font-bold hover:bg-white/10"
          >
            الاحتفاظ بالطلب
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-14 rounded-full bg-[#8b2538] px-5 font-bold hover:bg-[#a02a43]"
          >
            تأكيد الإلغاء
          </button>
        </div>
      </section>
    </dialog>
  );
}
