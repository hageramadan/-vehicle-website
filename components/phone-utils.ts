export const phoneCountries = [
  {
    iso: "sa",
    name: "السعودية",
    dial: "966",
    digits: 9,
    placeholder: "055 483 9201",
  },
  {
    iso: "eg",
    name: "مصر",
    dial: "20",
    digits: 10,
    placeholder: "010 1234 5678",
  },
  {
    iso: "ae",
    name: "الإمارات",
    dial: "971",
    digits: 9,
    placeholder: "050 123 4567",
  },
  {
    iso: "kw",
    name: "الكويت",
    dial: "965",
    digits: 8,
    placeholder: "5000 0000",
  },
  { iso: "qa", name: "قطر", dial: "974", digits: 8, placeholder: "5000 0000" },
  {
    iso: "bh",
    name: "البحرين",
    dial: "973",
    digits: 8,
    placeholder: "3000 0000",
  },
  { iso: "om", name: "عمان", dial: "968", digits: 8, placeholder: "9000 0000" },
] as const;
export function phoneDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[^0-9+]/g, "");
}
export function splitPhone(value: string) {
  const clean = phoneDigits(value);
  const country =
    phoneCountries.find((country) => clean.startsWith(`+${country.dial}`)) ||
    phoneCountries[0];
  return {
    country,
    national: clean.startsWith("+")
      ? clean.slice(country.dial.length + 1)
      : clean,
  };
}
export function normalizePhone(value: string) {
  const { country, national } = splitPhone(value);
  return `+${country.dial}${national.replace(/^0/, "")}`;
}
export function isValidPhone(value: string) {
  const { country, national } = splitPhone(value);
  const digits = national.replace(/^0/, "");
  return /^\d+$/.test(digits) && digits.length === country.digits;
}
