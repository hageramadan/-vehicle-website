import { FiCheck, FiClock } from "react-icons/fi";
import type { Vehicle } from "./types";

type ReviewCostProps = {
  vehicle: Vehicle;
  onConfirm: () => void;
  submitting?: boolean;
  onEdit: () => void;
};
export function ReviewCost({
  vehicle,
  onConfirm,
  onEdit,
  submitting,
}: ReviewCostProps) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-7 lg:p-9">
      <div className="border-b border-white/10 pb-7 text-center">
        <h2 className="text-sm text-[#969bb9]">التكلفة التقديرية</h2>
        <p className="mt-4 flex items-baseline justify-center gap-3">
          <strong className="text-[52px] font-extrabold leading-tight">
            {vehicle.price}
          </strong>
          <span className="text-base font-semibold">ر.س</span>
        </p>
        <p className="mt-2 text-xs text-[#969bb9]">شامل ضريبة القيمة المضافة</p>
      </div>
      <dl className="space-y-4 border-b border-white/10 py-6 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-[#969bb9]">المسافة التقديرية</dt>
          <dd className="text-xs text-[#dfe0ec]">لم تُحسب بعد</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[#969bb9]">نوع الخدمة</dt>
          <dd className="font-semibold text-[#dfe0ec]">{vehicle.name}</dd>
        </div>
      </dl>
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-white/5 p-4">
        <FiClock className="mt-1 shrink-0 text-[#c4a34f]" size={20} />
        <p className="text-xs leading-6 text-[#a0a5c0]">
          السعر تقديري، وقد يتغير حسب نوع الخدمة والموقع. يتم تحديد السعر
          النهائي قبل إرسال الطلب.
        </p>
      </div>
      <button
        type="button"
        onClick={onConfirm}
        disabled={submitting}
        className="primary-button mt-7 flex min-h-[58px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-l from-[#641027] to-[#881d35] px-6 text-base font-bold shadow-[0_18px_36px_-6px_#8c1a344d]"
      >
        {submitting ? "جارٍ حفظ الطلب..." : "تأكيد الطلب"} <FiCheck size={23} />
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="mx-auto mt-6 block text-sm font-bold text-[#c4a34f]"
      >
        تعديل البيانات
      </button>
    </aside>
  );
}
