"use client";

import Link from "next/link";
import Image from "next/image";
import { PhoneNumber } from "./phone-number";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiPhone, FiUser, FiMenu, FiX } from "react-icons/fi";

const navigation = [
  { href: "/", label: "الرئيسية" },
  { href: "/#about", label: "من نحن" },
  { href: "/#fleet", label: "أسطولنا" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/orders", label: "طلباتي" },
];

export function Logo() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-2 sm:gap-3"
      aria-label="العربة المتنقله - الرئيسية"
    >
      <Image
        src="/images/logo.png"
        alt="Mobile Vehicle - العربة المتنقله للخدمات اللوجستية"
        width={320}
        height={320}
        loading="eager"
        className="size-10 shrink-0 rounded-xl object-contain sm:size-12 lg:size-14"
      />
      <span className="text-right">
        <b className="block text-xs font-extrabold leading-6 sm:text-sm lg:text-lg">
          العربة المتنقله
        </b>
        <span className="block text-[9px] leading-5 text-[#989bad] sm:text-[10px] lg:text-xs">
          للخدمات اللوجستية
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <div className="bg-[#090b1e] text-xs font-normal leading-none text-[#bfc0cd]">
        <div className="container mx-auto flex h-9 items-center justify-between gap-2 text-[10px] min-[400px]:text-[11px] sm:h-[51px] sm:text-sm lg:text-[18px]">
          <span>خدمة موثوقة على مدار الساعة</span>
          <a
            href="tel:920016173"
            dir="ltr"
            className="flex shrink-0 items-center gap-2"
          >
            <FiPhone size={14} aria-hidden="true" />
            <PhoneNumber value="+966920016173" />
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-[#1b1f3a]">
        <div className="container mx-auto flex min-h-[72px] items-center justify-between gap-2 sm:min-h-24 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-8">
          <Logo />
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden items-center justify-center gap-6 text-[18.29px] leading-[1.62] font-semibold text-[#cdced9] xl:flex xl:gap-8"
          >
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                className={`whitespace-nowrap hover:text-white ${path === href ? "text-white" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3 justify-self-end">
            <Link
              href="/booking"
              className="primary-button primary-button--small hidden min-h-12 items-center justify-center rounded-full bg-gradient-to-l from-[#651026] to-[#861d36] px-6 text-sm font-bold text-white shadow-[0_18px_36px_-6px_#8c1a344d] sm:inline-flex"
            >
              اطلب سطحة الآن
            </Link>
            <Link
              href="/login"
              aria-label="تسجيل الدخول"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2d314d] text-xl text-white hover:bg-[#383d5b]"
            >
              <FiUser aria-hidden="true" />
            </Link>
            <button
              type="button"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex size-11 items-center justify-center rounded-full text-2xl xl:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="قائمة الهاتف"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-108px)] overflow-y-auto border-t border-white/10 bg-[#1b1f3a] px-4 py-3 text-sm font-semibold shadow-xl sm:max-h-[calc(100dvh-147px)] xl:hidden"
            onClick={() => setOpen(false)}
          >
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white/5"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="btn primary-button--small mt-2 w-full"
            >
              اطلب سطحة الآن
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
