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
    <section className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8">
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
        <ol
          aria-label="مراحل الطلب"
          className="flex flex-col gap-6 sm:flex-row sm:gap-0"
        >
          {labels.map((label, index) => {
            const done = index < completed;
            const time =
              order.timeline?.[index]?.at ||
              (index === 0 ? order.createdAt : undefined);
            return (
              <li
                key={label}
                className="relative grid min-w-0 grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-x-3 sm:flex sm:flex-1 sm:flex-col sm:text-center"
              >
                {index < 4 && (
                  <span
                    aria-hidden="true"
                    className={`absolute right-4 top-8 h-6 w-0.5 sm:right-1/2 sm:top-4 sm:h-0.5 sm:w-full ${index < completed - 1 ? "bg-[#25bf89]" : "bg-white/10"}`}
                  />
                )}
                <span
                  className={`relative flex size-8 items-center justify-center rounded-full text-xs ${done ? "bg-[#25bf89] text-white" : "bg-[#373e61] text-[#969bb9]"}`}
                >
                  {done ? <FiCheck size={18} /> : index + 1}
                </span>
                <span className="text-xs leading-6 text-[#a0a5bd] sm:mt-3">
                  {label}
                </span>
                <span className="text-[10px] text-[#969bb9] sm:mt-1">
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
