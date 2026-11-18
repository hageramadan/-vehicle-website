export type OrderFilter = "all" | "pending" | "active" | "completed";
export const orderStatuses: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  pending: {
    label: "بانتظار قبول الطلب",
    className: "bg-[#c4a34f]/10 text-[#c4a34f]",
    dot: "bg-[#c4a34f]",
  },
  active: {
    label: "جاري تنفيذ الطلب",
    className: "bg-[#c4a34f]/10 text-[#c4a34f]",
    dot: "bg-[#c4a34f]",
  },
  completed: {
    label: "مكتمل",
    className: "bg-emerald-400/10 text-[#25bf89]",
    dot: "bg-[#25bf89]",
  },
  cancelled: {
    label: "ملغي",
    className: "bg-rose-400/10 text-[#dc7089]",
    dot: "bg-[#dc7089]",
  },
};
