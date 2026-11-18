import { splitPhone } from "./phone-utils";
export function PhoneNumber({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const { country, national } = splitPhone(value);
  return (
    <span
      dir="ltr"
      className={`inline-flex items-center gap-2 whitespace-nowrap ${className}`}
    >
      <img
        src={`/images/flags/${country.iso}.svg`}
        alt={country.name}
        width={20}
        height={15}
        className="h-[15px] w-5 rounded-sm object-cover"
      />
      <span className="text-[#adb2ca]">+{country.dial}</span>
      <span>{national}</span>
    </span>
  );
}
