import { FiCheck } from "react-icons/fi";

const benefits = [
  "متابعة مباشرة لحالة الطلب",
  "طلبات الأفراد والشركات",
  "خصوصية وأمان بياناتك",
];

export function AuthIntroduction() {
  return (
    <aside className="relative isolate hidden h-full overflow-hidden bg-linear-to-b from-[#1c2553] to-primary px-10 pb-14 pt-23 md:block lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-0 -z-10 aspect-square w-[140%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,#6b1f2e5c_0%,#6b1f2e00_100%)]"
      >
        <div className="absolute inset-0 rounded-full bg-white/1.5" />
        <div className="absolute inset-[9%] rounded-full bg-white/2.5" />
        <div className="absolute inset-[18%] rounded-full border border-white/5 bg-primary/20" />
      </div>
      <p className="text-base lg:text-xl font-bold text-[#A7EFD0]">العربة المتنقله</p>
      <h2 className="mt-5 text-[38px] font-extrabold leading-[1.6] text-white lg:text-[56px]">
        كل رحلة تبدأ
        <br />
        بطلب أسهل
      </h2>
      <p className="mt-5 lg:mt-7 text-base lg:text-xl leading-8 text-[#C8CAD8]">
        تجربة موثوقة ومتكاملة لخدمة مركبتك أينما كنت.
      </p>
      <ul className="mt-10 space-y-6 text-base lg:text-xl font-semibold text-[#c0c4d6]">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-3">
            <FiCheck
              className="shrink-0 text-[#25bf89]"
              size={24}
              aria-hidden="true"
            />
            {benefit}
          </li>
        ))}
      </ul>
    </aside>
  );
}

