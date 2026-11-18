"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

export function BookingConfirmation({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  async function copyOrderId() {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setCopyError("");
    } catch {
      setCopyError("تعذر النسخ التلقائي. يمكنك تحديد رقم الطلب ونسخه يدويًا.");
    }
  }

  return (
    <section
      aria-labelledby="confirmation-title"
      className="mx-auto w-full max-w-[860px] rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex size-[72px] items-center justify-center rounded-full bg-emerald-400/10 shadow-[0_0_0_14px_#34d39905] sm:size-[88px]">
        <FiCheck
          className="size-10 text-[#25bf89] sm:size-11"
          aria-hidden="true"
        />
      </div>
      <p className="mt-6 text-xs font-bold text-[#25bf89]">تم استلام طلبك</p>
      <h1
        id="confirmation-title"
        className="mt-3 text-[22px] font-extrabold leading-relaxed text-white sm:text-[28px] lg:text-[32px]"
      >
        تم إرسال طلبك بنجاح
      </h1>
      <p className="mt-3 text-xs leading-7 text-[#969bb9] sm:text-sm">
        يمكنك متابعة تفاصيل طلبك وحالته من صفحة طلباتي.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-white/5 px-5 py-4 text-right sm:px-6">
        <span className="text-xs text-[#969bb9] sm:text-sm">رقم الطلب</span>
        <b
          dir="ltr"
          className="select-all text-base font-bold text-[#c4a34f] sm:text-lg"
        >
          {orderId}
        </b>
        <button
          type="button"
          onClick={copyOrderId}
          aria-label="نسخ رقم الطلب"
          className="mr-auto rounded px-1 text-sm font-bold text-[#c4a34f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a34f]"
        >
          {copied ? "تم النسخ" : "نسخ"}
        </button>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? "تم نسخ رقم الطلب" : ""}
      </p>
      {copyError && (
        <p role="alert" className="mt-2 text-xs text-rose-300">
          {copyError}
        </p>
      )}

      <div className="mt-4 flex min-h-[72px] items-center gap-3 rounded-xl border border-[#c4a34f]/25 bg-[#c4a34f]/5 px-5 py-4 text-right sm:px-6">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f7e9b4]">
          <span className="size-3 rounded-full bg-[#e5b735]" />
        </span>
        <div>
          <p className="text-xs text-[#969bb9]">حالة الطلب</p>
          <p className="mt-1 text-sm font-bold text-[#d2b159] sm:text-base">
            بانتظار قبول الطلب
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/orders"
          className="primary-button primary-button--compact flex min-h-[56px] items-center justify-center rounded-full bg-gradient-to-l from-[#641027] to-[#881d35] px-6 text-base font-bold text-white shadow-[0_18px_36px_-6px_#8c1a344d]"
        >
          عرض طلباتي
        </Link>
        <Link
          href="/"
          className="flex min-h-[56px] items-center justify-center rounded-full border-2 border-[#929bb4]/40 bg-white/5 px-6 text-base font-bold text-[#dfe0ec] hover:bg-white/10"
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
}
