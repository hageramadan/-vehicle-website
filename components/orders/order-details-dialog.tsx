import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import type { Order } from "../booking/types";
import { orderStatuses } from "./order-status";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderDetailsDialog({
  order,
  onClose,
  onCancel,
}: {
  order: Order;
  onClose: () => void;
  onCancel: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-labelledby="order-details-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%_-_32px)] max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1b2243] p-0 text-[#dfe0ec] shadow-2xl backdrop:bg-black/70"
    >
      <section
        className="p-4 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="order-details-title" className="font-bold">
            تفاصيل الطلب{" "}
            <span dir="ltr" className="text-[#c4a34f]">
              {order.id}
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق تفاصيل الطلب"
            className="rounded-full bg-white/5 p-2"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="mt-5">
          <OrderStatusBadge status={order.status} />
        </div>
        <dl className="my-7 space-y-4 text-sm">
          {[
            ["السطحة", order.vehicle],
            ["تاريخ الطلب", order.date],
            ["الاستلام", order.pickup || "لم يُحدد"],
            ["الوجهة", order.destination || "لم تُحدد"],
            ["الحالة", orderStatuses[order.status]?.label || order.status],
            ["ملاحظات", order.notes || "لا توجد"],
            ["التكلفة التقديرية", `${order.price} ر.س`],
          ].map(([label, value]) => (
            <div className="flex justify-between gap-5" key={label}>
              <dt className="shrink-0 text-[#969bb9]">{label}</dt>
              <dd className="min-w-0 break-words text-left">{value}</dd>
            </div>
          ))}
        </dl>
        {order.status === "pending" && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-rose-400/40 px-4 py-2 text-xs text-rose-300"
          >
            إلغاء الطلب التجريبي
          </button>
        )}
      </section>
    </dialog>
  );
}
