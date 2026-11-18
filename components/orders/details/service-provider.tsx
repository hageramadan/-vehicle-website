import Link from "next/link";
import { FiUser, FiMessageSquare, FiPhone } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import type { Order } from "../../booking/types";
export function ServiceProvider({ order }: { order: Order }) {
  const provider = order.provider;
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
      {provider && (
        <p className="mb-6 mr-auto flex w-fit items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-[#25bf89]">
          <span className="size-1.5 rounded-full bg-[#25bf89]" />
          {order.status === "completed" ? "انتهت الخدمة" : "في الطريق للوجهة"}
        </p>
      )}
      <h2 className="text-lg font-semibold">مقدم الخدمة</h2>
      <div className="my-5 flex items-center gap-4">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#c4a34f]">
          <FiUser size={28} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold">
            {provider?.name || "لم يتم تعيين مقدم خدمة بعد"}
          </p>
          <p className="mt-1 text-xs text-[#969bb9]">
            {provider ? "مقدم خدمة معتمد" : "سيظهر هنا عند قبول الطلب"}
          </p>
          {provider?.rating !== undefined && (
            <p
              aria-label={`التقييم ${provider.rating} من 5`}
              className="mt-2 flex gap-1"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    star <= Math.round(provider.rating!)
                      ? "text-[#e1b746]"
                      : "text-white/20"
                  }
                />
              ))}
            </p>
          )}
        </div>
        <Link
          href={`/orders/${encodeURIComponent(order.id)}/chat`}
          aria-label="فتح محادثة الطلب"
          className="rounded-full bg-white/5 p-3 text-[#c1c6da] hover:bg-white/10"
        >
          <FiMessageSquare size={19} />
        </Link>
      </div>
      {provider?.phone ? (
        <a
          href={`tel:${provider.phone.replace(/[^+\d]/g, "")}`}
          className="flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 text-sm font-bold"
        >
          <FiPhone size={19} />
          اتصل بمقدم الخدمة
        </a>
      ) : (
        <div
          aria-disabled="true"
          title={order.isDemo ? "الاتصال غير متاح للطلب التجريبي" : undefined}
          className="flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 text-xs text-[#969bb9]"
        >
          <FiPhone size={18} />
          {order.isDemo ? "اتصل بمقدم الخدمة" : "بيانات الاتصال غير متاحة بعد"}
        </div>
      )}
    </section>
  );
}
