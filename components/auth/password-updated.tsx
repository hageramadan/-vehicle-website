import Link from "next/link";
import { FiCheck } from "react-icons/fi";
export function PasswordUpdated() {
  return (
    <section className="flex min-w-0 flex-col items-center justify-center px-4 py-10 text-center sm:px-12 sm:py-16 md:py-24 lg:px-16">
      <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-emerald-400/10 shadow-[0_0_0_12px_#34d39905]">
        <FiCheck size={48} className="text-[#25bf89]" />
      </div>
      <h1 className="text-[28px] font-extrabold leading-[1.6] text-white lg:text-[34px]">
        تم تحديث كلمة المرور
      </h1>
      <p className="mt-3 text-sm leading-8 text-[#a0a5bd]">
        يمكنك الآن العودة إلى صفحة تسجيل الدخول.
      </p>
      <Link href="/login" className="btn mt-8 min-h-14 w-full text-base">
        العودة إلى تسجيل الدخول
      </Link>
      <p className="mt-4 text-[11px] leading-6 text-[#969bb9]">
        معاينة للفلو فقط، لا يتم تغيير كلمة مرور حساب فعلي.
      </p>
    </section>
  );
}
