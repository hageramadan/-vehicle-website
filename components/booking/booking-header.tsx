import { FiCheck } from "react-icons/fi";

const steps = [
  {
    label: "نوع السطحة",
    eyebrow: "طلب جديد",
    title: "اختر نوع السطحة",
    description: "اختر المركبة الأنسب لنقل سيارتك بأمان",
  },
  {
    label: "بيانات الرحلة",
    eyebrow: "بيانات الرحلة",
    title: "من أين نأخذ مركبتك؟",
    description: "حدد موقع الاستلام والوجهة ثم أضف أي تفاصيل تساعد مقدم الخدمة",
  },
  {
    label: "المراجعة",
    eyebrow: "مراجعة الطلب",
    title: "كل شيء جاهز للتأكيد",
    description: "راجع تفاصيل رحلتك والتكلفة التقديرية قبل إرسال الطلب",
  },
  {
    label: "التأكيد",
    eyebrow: "شكرًا لثقتك",
    title: "تم تسجيل طلبك بنجاح",
    description: "تم حفظ الطلب في هذا المتصفح للعرض التجريبي",
  },
];

export function BookingHeader({ step }: { step: number }) {
  const current = steps[step];
  return (
    <>
      <ol
        aria-label="خطوات الحجز"
        className="mx-auto mb-16 flex w-full max-w-[1056px] items-start sm:mb-24"
      >
        {steps.map(({ label }, index) => {
          const completed = index < step;
          const active = index === step;
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className="relative flex min-w-0 flex-1 flex-col items-center gap-2 text-center text-[10px] leading-6 text-[#c5c7d7] sm:text-sm"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-[calc(50%+22px)] top-[15px] h-0.5 w-[calc(100%-44px)] sm:right-[calc(50%+61px)] sm:top-5 sm:w-[calc(100%-122px)] ${completed ? "bg-[#891b32]" : "bg-[#c5c7d7]"}`}
                />
              )}
              <span
                className={`flex size-8 lg:size-9 items-center justify-center rounded-full border-2 text-sm  ${completed ? "border-[#a02a43] bg-[#67152b] text-white" : active ? "border-[#b3364e] bg-white text-[#a02a43]" : "border-[#c5c7d7] bg-transparent"}`}
              >
                {completed ? (
                  <FiCheck className="size-4 sm:size-5" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={active ? "font-bold text-[#dfe0ec]" : "font-normal"}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      {step !== 3 && (
        <div className="mb-12 text-center sm:mb-14">
          <p className="text-base font-bold leading-8 text-[#c4a34f] sm:text-[22px]">
            {current.eyebrow}
          </p>
          <h1 className="mt-3 text-[30px] font-extrabold leading-[1.6] text-white sm:text-[42px] lg:text-[52px]">
            {current.title}
          </h1>
          <p className="mt-4 text-sm font-normal leading-[1.7] text-[#a0a4bd] sm:text-lg lg:text-[22px]">
            {current.description}
          </p>
        </div>
      )}
    </>
  );
}
