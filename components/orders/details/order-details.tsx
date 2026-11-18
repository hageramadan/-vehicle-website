"use client";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { OrderStatusBadge } from "../order-status-badge";
import { cancelOrder } from "../order-storage";
import { ReviewTrip } from "../../booking/review-trip";
import { useOrderRecord } from "./use-order-record";
import { OrderProgress } from "./order-progress";
import { OrderSummary } from "./order-summary";
import { ServiceProvider } from "./service-provider";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { OrderPhotos } from "./order-photos";
export function OrderDetails({ id }: { id: string }) {
  const { order, setOrder, ready, error } = useOrderRecord(id);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [cancelled, setCancelled] = useState(false);
  function confirmCancel() {
    try {
      setOrder(cancelOrder(id));
      setCancelling(false);
      setCancelled(true);
      setCancelError("");
    } catch (error) {
      setCancelError(
        error instanceof Error
          ? error.message
          : "تعذر إلغاء الطلب. حاول مرة أخرى.",
      );
    }
  }
  return (
    <main className="container mx-auto min-h-[calc(100svh-var(--site-header-height))] py-7 sm:py-10">
      <Link
        href="/orders"
        className="mb-8 flex items-center gap-2 text-sm text-[#969bb9]"
      >
        <FiChevronRight size={20} />
        العودة إلى طلباتي
      </Link>
      {!ready ? (
        <p role="status" className="py-16 text-center text-[#969bb9]">
          جارٍ تحميل تفاصيل الطلب...
        </p>
      ) : !order ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-2xl font-bold">لم يتم العثور على الطلب</h1>
          <p className="mt-4 text-sm text-[#969bb9]">
            {error || "الطلب غير محفوظ في هذا المتصفح."}
          </p>
        </div>
      ) : (
        <>
          {cancelled && (
            <p
              role="status"
              className="mb-8 flex items-center gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/10 p-5 text-sm font-bold text-emerald-300"
            >
              <FiCheck size={22} />
              تم إلغاء الطلب بنجاح وتحديث حالته.
            </p>
          )}
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs text-[#969bb9]">
                {order.isDemo && (
                  <span className="ml-2 rounded-full bg-white/5 px-2 py-1 text-[10px]">
                    طلب تجريبي
                  </span>
                )}
                طلب رقم{" "}
                <b dir="ltr" className="text-[#c4a34f]">
                  {order.id}
                </b>
              </p>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-[42px]">
                تفاصيل الطلب
              </h1>
              <p className="mt-3 text-xs text-[#969bb9]">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString("ar-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : order.date}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </header>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.37fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <OrderProgress order={order} />
              <ReviewTrip
                title="مسار الرحلة"
                pickup={order.pickup}
                destination={order.destination}
                pickupPoint={order.pickupPoint || null}
                destinationPoint={order.destinationPoint || null}
              />
              <OrderPhotos id={id} count={order.photoCount} />
            </div>
            <aside className="space-y-5">
              {order.status !== "cancelled" && (
                <ServiceProvider order={order} />
              )}
              <OrderSummary order={order} />
              {["pending", "active"].includes(order.status) && (
                <section className="rounded-2xl border border-white/10 min-w-0 bg-white/5 p-4 sm:p-6 lg:p-8">
                  <h2 className="text-lg font-semibold">إدارة الطلب</h2>
                  <p className="mt-2 text-xs leading-6 text-[#969bb9]">
                    سيتم تحديث حالة الطلب بعد تأكيد الإلغاء.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCancelError("");
                      setCancelling(true);
                    }}
                    className="mt-5 min-h-12 w-full rounded-lg border border-[#a5455d] bg-[#8b2538]/10 text-sm font-bold text-[#df8196]"
                  >
                    إلغاء الطلب
                  </button>
                </section>
              )}
            </aside>
          </div>
          {cancelling && (
            <CancelOrderDialog
              id={id}
              error={cancelError}
              onKeep={() => setCancelling(false)}
              onConfirm={confirmCancel}
            />
          )}
        </>
      )}
    </main>
  );
}
