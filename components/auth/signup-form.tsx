"use client";
import { AuthContainer } from "./auth-container";
import { useState } from "react";
import { FiChevronRight, FiUser, FiMail, FiFileText } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PhoneInput } from "../phone-input";
import { normalizePhone } from "../phone-utils";
import { PasswordField } from "./password-field";
import { AuthTextField } from "./auth-text-field";
import { AuthorizationUpload } from "./authorization-upload";
import { validateSignup, authorizationError } from "./signup-validation";
import type { AccountKind } from "./account-type-selection";
import type { SignupDraft } from "./signup-types";
export type { SignupDraft } from "./signup-types";

export function SignupForm({
  kind,
  initial,
  onContinue,
  onBack,
}: {
  kind: AccountKind;
  initial: SignupDraft | null;
  onContinue: (draft: SignupDraft) => void;
  onBack: () => void;
}) {
  const company = kind === "company";
  const [phone, setPhone] = useState(initial?.phone || "");
  const [file, setFile] = useState<File | null>(
    initial?.authorizationFile || null,
  );
  const [acceptedTerms, setAcceptedTerms] = useState(
    initial?.acceptedTerms || false,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = validateSignup({ kind, data, phone, file, acceptedTerms });
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    const read = (name: string) => String(data.get(name) || "").trim();
    const firstName = read("firstName"),
      lastName = read("lastName");
    onContinue({
      kind,
      name: company ? read("companyName") : `${firstName} ${lastName}`,
      phone: normalizePhone(phone),
      email: read("email"),
      registration: read("registration"),
      firstName,
      lastName,
      representativeName: read("representativeName"),
      authorizationFile: file,
      acceptedTerms,
    });
  }
  const phoneField = (
    <div>
      <p className="mb-2 text-base font-bold text-[#c8ccdc]">
        {company ? "رقم جوال الشخص المفوض" : "رقم الجوال"}{" "}
        <span className="text-[#e06779]">*</span>
      </p>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        label={company ? "رقم جوال الشخص المفوض" : "رقم الجوال"}
        required
        error={errors.phone}
      />
    </div>
  );
  const emailField = (
    <AuthTextField
      name="email"
      label="البريد الإلكتروني"
      type="email"
      autoComplete="email"
      defaultValue={initial?.email}
      placeholder="name@example.com"
      icon={<FiMail />}
      error={errors.email}
      required={false}
    />
  );
  return (
    <AuthContainer>
      <header>
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm text-[#969bb9]"
        >
          <FiChevronRight size={22} />
          العودة
        </button>
        <p className="text-sm font-bold text-[#c4a34f]">إنشاء حساب جديد</p>
        <h1 className="mt-3 text-[30px] font-extrabold leading-[1.6] text-white sm:text-[40px]">
          {company ? "بيانات الشركة" : "بيانات الحساب الفردي"}
        </h1>
        <p className="mt-2 text-base leading-8 text-[#969bb9]">
          جميع الحقول المعلمة بنجمة مطلوبة
        </p>
      </header>
      <form
        noValidate
        onSubmit={submit}
        className="mt-12 rounded-[22px] border border-white/10 bg-white/5 p-6 sm:p-10"
      >
        <div className="grid items-start gap-x-6 gap-y-7 md:grid-cols-2">
          {company ? (
            <>
              <AuthTextField
                name="companyName"
                label="اسم الشركة"
                placeholder="اسم الشركة كما هو مسجل"
                autoComplete="organization"
                defaultValue={initial?.name}
                icon={<HiOutlineBuildingOffice2 />}
                error={errors.companyName}
              />
              <AuthTextField
                name="registration"
                label="رقم السجل التجاري"
                placeholder="10 أرقام"
                inputMode="numeric"
                defaultValue={initial?.registration}
                icon={<FiFileText />}
                error={errors.registration}
              />
              <AuthTextField
                name="representativeName"
                label="اسم الشخص المفوض"
                placeholder="الاسم الثلاثي"
                autoComplete="name"
                defaultValue={initial?.representativeName}
                icon={<FiUser />}
                error={errors.representativeName}
              />
              {phoneField}
              {emailField}
              <AuthorizationUpload
                file={file}
                error={errors.authorization}
                onChange={(value) => {
                  setFile(value);
                  setErrors((current) => ({
                    ...current,
                    authorization: value ? authorizationError(value) : "",
                  }));
                }}
              />
            </>
          ) : (
            <>
              <AuthTextField
                name="firstName"
                label="الاسم الأول"
                autoComplete="given-name"
                defaultValue={initial?.firstName}
                icon={<FiUser />}
                error={errors.firstName}
              />
              <AuthTextField
                name="lastName"
                label="الاسم الأخير"
                autoComplete="family-name"
                defaultValue={initial?.lastName}
                icon={<FiUser />}
                error={errors.lastName}
              />
              {phoneField}
              {emailField}
            </>
          )}
          <PasswordField
            name="password"
            label="كلمة المرور"
            placeholder="8 أحرف على الأقل"
            error={errors.password}
          />
          <PasswordField
            name="confirm"
            label="تأكيد كلمة المرور"
            placeholder="أعد إدخال كلمة المرور"
            error={errors.confirm}
          />
        </div>
        <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm leading-7 text-[#a0a5bd]">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => {
              setAcceptedTerms(event.target.checked);
              setErrors((current) => ({ ...current, terms: "" }));
            }}
            aria-invalid={Boolean(errors.terms)}
            aria-describedby={errors.terms ? "signup-terms-error" : undefined}
            className="size-[18px] shrink-0 accent-[#8b2538]"
          />
          <span>أوافق على الشروط والأحكام وسياسة الخصوصية</span>
        </label>
        {errors.terms && (
          <p
            id="signup-terms-error"
            role="alert"
            className="mt-2 text-xs font-semibold text-[#ef5965]"
          >
            {errors.terms}
          </p>
        )}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="btn min-h-14 w-full text-base sm:w-[228px]"
          >
            إنشاء الحساب
          </button>
        </div>
      </form>
    </AuthContainer>
  );
}
