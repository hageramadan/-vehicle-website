import { orderStatuses } from "./order-status";
export function OrderStatusBadge({ status }: { status: string }) {
  const state = orderStatuses[status];
  if (!state) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${state.className}`}
    >
      <span
        className={`size-1.5 rounded-full ${state.dot}`}
        aria-hidden="true"
      />
      {state.label}
    </span>
  );
}
