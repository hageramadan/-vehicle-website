import { isValidPhone, splitPhone } from "../phone-utils";
export const DEMO_CODE = "1234";
export function phoneError(phone: string) {
  const parsed = splitPhone(phone);
  if (
    isValidPhone(phone) &&
    (parsed.country.iso !== "sa" ||
      /^5\d{8}$/.test(parsed.national.replace(/^0/, "")))
  )
    return "";
  return splitPhone(phone).country.iso === "sa"
    ? "أدخل رقم جوال سعودي صحيح يبدأ بـ 05"
    : "أدخل رقم جوال صحيحًا مطابقًا للدولة المختارة";
}
export function passwordError(value: string) {
  return value.length < 6 ? "كلمة المرور يجب ألا تقل عن 6 أحرف" : "";
}
