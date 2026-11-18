import { phoneError } from "./validation";
import type { AccountKind } from "./account-type-selection";
export function authorizationError(file: File | null) {
  if (!file) return "أرفق صورة خطاب التفويض";
  if (file.size > 5 * 1024 * 1024)
    return "حجم الملف يجب ألا يزيد عن 5 ميجابايت";
  if (
    !/\.(pdf|jpe?g|png)$/i.test(file.name) ||
    !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
  )
    return "اختر ملف PDF أو JPG أو PNG";
  return "";
}
export function validateSignup({
  kind,
  data,
  phone,
  file,
  acceptedTerms,
}: {
  kind: AccountKind;
  data: FormData;
  phone: string;
  file: File | null;
  acceptedTerms: boolean;
}) {
  const read = (name: string) => String(data.get(name) || "").trim();
  const email = read("email");
  const password = String(data.get("password") || "");
  const errors: Record<string, string> = {
    phone: phoneError(phone),
    email:
      !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "أدخل بريدًا إلكترونيًا صحيحًا",
    password: password.length >= 8 ? "" : "كلمة المرور يجب ألا تقل عن 8 أحرف",
    confirm:
      password === data.get("confirm") ? "" : "كلمتا المرور غير متطابقتين",
    terms: acceptedTerms
      ? ""
      : "يجب الموافقة على الشروط والأحكام وسياسة الخصوصية",
  };
  if (kind === "individual") {
    errors.firstName = read("firstName") ? "" : "أدخل الاسم الأول";
    errors.lastName = read("lastName") ? "" : "أدخل الاسم الأخير";
  } else {
    errors.companyName = read("companyName") ? "" : "أدخل اسم الشركة";
    errors.registration = /^\d{10}$/.test(read("registration"))
      ? ""
      : "أدخل رقم السجل التجاري المكون من 10 أرقام";
    errors.representativeName = read("representativeName")
      ? ""
      : "أدخل اسم الشخص المفوض";
    errors.authorization = authorizationError(file);
  }
  return errors;
}
