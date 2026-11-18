import { PhoneNumber } from "../../phone-number";
import type { Order } from "../../booking/types";
export function OrderSummary({ order }: { order: Order }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
      <h2 className="mb-6 text-lg font-semibold">ملخص الطلب</h2>
      <dl className="text-sm">
        <div className="flex justify-between gap-4 border-b border-white/10 py-4">
          <dt className="text-[#969bb9]">نوع السطحة</dt>
          <dd className="font-semibold">{order.vehicle}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-b border-white/10 py-4">
          <dt className="text-[#969bb9]">رقم التواصل</dt>
          <dd>
            {order.phone ? <PhoneNumber value={order.phone} /> : "لم يُحدد"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-white/10 py-4">
          <dt className="text-[#969bb9]">المسافة التقديرية</dt>
          <dd>
            {order.distanceKm !== undefined
              ? `${order.distanceKm} كم`
              : "لم تُحسب بعد"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-white/10 py-4">
          <dt className="text-[#969bb9]">التكلفة</dt>
          <dd className="text-xl font-extrabold text-[#c4a34f]">
            {order.price} ر.س
          </dd>
        </div>
      </dl>
      {order.notes && (
        <p className="mt-4 break-words text-xs leading-7 text-[#a0a5bd]">
          {order.notes}
        </p>
      )}
    </section>
  );
}
