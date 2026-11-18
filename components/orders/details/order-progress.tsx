import { FiCheck } from "react-icons/fi";
import type { Order } from "../../booking/types";
const labels = [
  "تم إرسال الطلب",
  "تم قبول الطلب",
  "وصول مقدم الخدمة",
  "جاري سحب الطلب",
  "اكتمال الطلب",
];
export function OrderProgress({ order }: { order: Order }) {
  const completed =
    order.status === "completed" ? 5 : order.status === "active" ? 4 : 1;
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
      <h2 className="mb-7 text-lg font-semibold">حالة الطلب</h2>
      {order.status === "cancelled" ? (
        <div className="rounded-xl border border-[#8b2538]/20 bg-[#8b2538]/15 p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#8b2538]/20 px-3 py-1 text-xs font-bold text-[#d87991]">
            <span className="size-1.5 rounded-full bg-[#d87991]" />
            تم إلغاء الطلب
          </p>
          <p className="mt-4 text-sm leading-7 text-[#969bb9]">
            لن يستمر تنفيذ هذا الطلب. يمكنك إنشاء طلب جديد في أي وقت.
          </p>
        </div>
      ) : (
        <ol aria-label="مراحل الطلب" className="flex">
          {labels.map((label, index) => {
            const done = index < completed;
            const time =
              order.timeline?.[index]?.at ||
              (index === 0 ? order.createdAt : undefined);
            return (
              <li
                key={label}
                className="relative flex min-w-0 flex-1 flex-col items-center text-center"
              >
                {index < 4 && (
                  <span
                    aria-hidden="true"
                    className={`absolute right-1/2 top-4 h-0.5 w-full ${index < completed - 1 ? "bg-[#25bf89]" : "bg-white/10"}`}
                  />
                )}
                <span
                  className={`relative flex size-8 items-center justify-center rounded-full text-xs ${done ? "bg-[#25bf89] text-white" : "bg-[#373e61] text-[#969bb9]"}`}
                >
                  {done ? <FiCheck size={18} /> : index + 1}
                </span>
                <span className="mt-3 text-[10px] leading-5 text-[#a0a5bd] sm:text-xs">
                  {label}
                </span>
                <span className="mt-1 text-[10px] text-[#969bb9]">
                  {time
                    ? new Date(time).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
