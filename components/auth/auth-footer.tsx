import Link from "next/link";
export function AuthFooter({ text = "تذكرت كلمة المرور؟" }: { text?: string }) {
  return (
    <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm lg:text-base leading-7 text-[#969bb9]">
      {text}{" "}
      <Link href="/login" className="mr-2 font-bold text-[#c4a34f]">
        تسجيل الدخول
      </Link>
    </p>
  );
}
