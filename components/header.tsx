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
      className="flex shrink-0 items-center gap-3"
      aria-label="العربة المتنقله - الرئيسية"
    >
      <Image
        src="/images/logo.png"
        alt="Mobile Vehicle - العربة المتنقله للخدمات اللوجستية"
        width={320}
        height={320}
        loading="eager"
        className="size-12 shrink-0 rounded-xl object-contain lg:size-14"
      />
      <span className="text-right">
        <b className="block text-sm font-extrabold leading-7 lg:text-lg">
          العربة المتنقله
        </b>
        <span className="block text-[10px] leading-5 text-[#989bad] lg:text-xs">
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
        <div className="container mx-auto flex h-[51px] items-center justify-between gap-2 px-4 text-[9px] min-[400px]:text-[11px] sm:text-[18px] lg:px-0">
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
        <div className="container mx-auto flex min-h-24 items-center justify-between gap-3 px-4 lg:px-0 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <Logo />
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden items-center justify-center gap-6 text-[18.29px] leading-[1.62] font-semibold text-[#cdced9] lg:flex xl:gap-8"
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
          <div className="flex items-center gap-3 justify-self-end">
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
              className="flex size-10 items-center justify-center text-2xl lg:hidden"
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
            className="container mx-auto flex flex-col gap-5 px-4 lg:px-0 border-t border-white/10 py-5 text-sm font-semibold lg:hidden"
            onClick={() => setOpen(false)}
          >
            {navigation.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/booking" className="text-rose-300">
              اطلب سطحة الآن
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
