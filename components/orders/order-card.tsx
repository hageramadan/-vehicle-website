import Link from "next/link";
import { FiChevronLeft, FiTruck } from "react-icons/fi";
import type { Order } from "../booking/types";
import { OrderStatusBadge } from "./order-status-badge";
export function OrderCard({ order }: { order: Order }) {
  return (
    <article
      aria-label={`طلب ${order.id}`}
      className="motion-card overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <div className="flex min-h-[66px] flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#969bb9]">رقم الطلب</span>
          <h2 dir="ltr" className="text-sm font-bold text-[#c4a34f]">
            {order.id}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {order.isDemo && (
            <span className="text-[10px] text-[#969bb9]">تجريبي</span>
          )}
          <OrderStatusBadge status={order.status} />
        </div>
      </div>
      <div className="grid items-center gap-4 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 text-sm sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1.1fr_.65fr]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#c4a34f]">
            <FiTruck size={24} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-bold text-[#dfe0ec]">{order.vehicle}</h3>
            <p className="mt-2 text-xs text-[#969bb9]">{order.date}</p>
          </div>
        </div>
        <p className="flex min-w-0 items-center gap-2.5 text-xs leading-6 text-[#c0c5db]">
          <span
            className="size-2 shrink-0 rounded-full bg-[#25bf89] shadow-[0_0_7px_#25bf8950]"
            aria-hidden="true"
          />
          <span className="sr-only">الاستلام: </span>
          <span className="break-words">
            {order.pickup || "لم يُحدد موقع الاستلام"}
          </span>
        </p>
        <p className="flex min-w-0 items-center gap-2.5 text-xs leading-6 text-[#c0c5db]">
          <span
            className="size-1.5 shrink-0 rounded-full bg-white"
            aria-hidden="true"
          />
          <span className="sr-only">الوجهة: </span>
          <span className="break-words">
            {order.destination || "لم تُحدد الوجهة"}
          </span>
        </p>
        <div className="text-right lg:text-left">
          <p className="text-xs text-[#969bb9]">التكلفة</p>
          <p className="mt-2 font-extrabold text-white">{order.price} ر.س</p>
        </div>
      </div>
      <div className="flex justify-end border-t border-white/10 px-4 py-4 sm:px-6">
        <Link
          href={`/orders/${encodeURIComponent(order.id)}`}
          className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[#c4a34f]"
        >
          عرض تفاصيل الطلب <FiChevronLeft size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
