import { FiArrowRight, FiChevronLeft } from "react-icons/fi";

const nextLabels = [
  "التالي: بيانات الرحلة",
  "عرض التكلفة والملخص",
  "تأكيد الطلب",
];

type BookingNavigationProps = {
  step: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function BookingNavigation({
  step,
  onPrevious,
  onNext,
}: BookingNavigationProps) {
  if (step >= nextLabels.length) return null;
  return (
    <div className="mt-6 sm:mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {step > 0 ? (
        <button
          type="button"
          className="flex min-h-11 items-center justify-center gap-2 text-sm text-slate-400 sm:justify-start"
          onClick={onPrevious}
        >
          <FiArrowRight />
          السابق
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        className="primary-button primary-button--compact whitespace-nowrap flex min-h-[58px] w-full items-center justify-center gap-4 rounded-full bg-gradient-to-l from-[#641027] to-[#881d35] px-8 text-sm font-extrabold text-white shadow-[0_12px_35px_#801b3a40] sm:w-[272px]"
        onClick={onNext}
      >
        {nextLabels[step]}
        <FiChevronLeft size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
