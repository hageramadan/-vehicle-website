import Link from "next/link";
import { FiTruck } from "react-icons/fi";
export function OrdersEmpty() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
      <FiTruck className="mx-auto mb-5 text-[#969bb9]" size={45} />
      <h2 className="text-lg font-bold">لا توجد طلبات هنا بعد</h2>
      <p className="mt-3 text-sm text-[#969bb9]">
        ستظهر طلباتك هنا بعد تأكيد الحجز.
      </p>
      <Link className="btn primary-button--small mt-7" href="/booking">
        اطلب سطحة الآن
      </Link>
    </div>
  );
}
