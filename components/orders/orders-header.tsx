import Link from "next/link";
export function OrdersHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-5">
      <div>
        <h1 className="text-[34px] font-extrabold leading-normal text-white sm:text-[42px]">
          طلباتي
        </h1>
        <p className="mt-3 text-sm text-[#969bb9]">
          تابع جميع طلباتك الحالية والسابقة
        </p>
      </div>
      <Link
        href="/booking"
        className="primary-button primary-button--small inline-flex w-full sm:w-auto min-h-[60px] items-center justify-center rounded-full bg-gradient-to-l from-[#641027] to-[#881d35] px-7 text-sm font-bold text-white shadow-[0_18px_36px_-6px_#8c1a344d] sm:px-9"
      >
        طلب سطحة جديد
      </Link>
    </header>
  );
}
