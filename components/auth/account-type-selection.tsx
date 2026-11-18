import { FiUser, FiChevronLeft } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AuthFooter } from "./auth-footer";
export type AccountKind = "individual" | "company";
export function AccountTypeSelection({
  onSelect,
}: {
  onSelect: (kind: AccountKind) => void;
}) {
  return (
    <section className="flex min-w-0 flex-col justify-center px-4 py-8 sm:px-12 sm:py-14 md:py-24 lg:px-16">
      <h1 className="text-[30px] font-extrabold leading-[1.6] text-white lg:text-[40px]">
        إنشاء حساب جديد
      </h1>
      <p className="mt-2 text-sm leading-8 text-[#a0a5bd] lg:text-xl">
        اختر نوع الحساب المناسب لك للمتابعة
      </p>
      <div className="mt-9 space-y-4">
        {(
          [
            {
              kind: "individual",
              title: "تسجيل حساب فردي",
              description: "اطلب خدمات نقل مركبتك الشخصية",
              Icon: FiUser,
            },
            {
              kind: "company",
              title: "تسجيل حساب شركة",
              description: "اطلب خدمات مركبات منشأتك",
              Icon: HiOutlineBuildingOffice2,
            },
          ] as const
        ).map(({ kind, title, description, Icon }) => (
          <button
            key={kind}
            type="button"
            onClick={() => onSelect(kind)}
            className="flex min-h-[112px] w-full items-center gap-3 sm:min-h-[130px] sm:gap-4 rounded-2xl border-[1.5px] border-white/10 bg-white/5 p-3 text-right sm:p-6 transition-colors duration-200 hover:border-[#b32b46] hover:bg-[#6b1f2e]/30 hover:brightness-100 focus-visible:border-[#b32b46] focus-visible:bg-[#6b1f2e]/30 focus-visible:outline-none"
          >
            <span className="flex size-11 shrink-0 sm:size-16 items-center justify-center rounded-xl bg-[#c4a34f]/10 text-[#c4a34f]">
              <Icon size={31} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold sm:text-lg text-[#dfe0ec]">
                {title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-[#969bb9]">
                {description}
              </span>
            </span>
            <FiChevronLeft size={24} className="shrink-0" />
          </button>
        ))}
      </div>
      <AuthFooter text="لديك حساب بالفعل؟" />
    </section>
  );
}
