import { demoOrders } from "./demo-order";
import type { Order } from "../booking/types";
export const ORDERS_UPDATED = "vehicle-orders-updated";
export function readOrders(): Order[] {
  const value: unknown = JSON.parse(
    localStorage.getItem("vehicle-orders") || "[]",
  );
  const orders = Array.isArray(value)
    ? value.filter(
        (item): item is Order =>
          item &&
          typeof item.id === "string" &&
          typeof item.vehicle === "string" &&
          typeof item.price === "number",
      )
    : [];
  if (!localStorage.getItem("vehicle-demo-orders-v2")) {
    for (const demoOrder of demoOrders) {
      if (!orders.some((order) => order.id === demoOrder.id)) {
        orders.push(demoOrder);
      }
    }
    localStorage.setItem("vehicle-orders", JSON.stringify(orders));
    localStorage.setItem("vehicle-demo-orders-v2", "true");
  }
  return orders;
}
export function saveOrders(orders: Order[]) {
  localStorage.setItem("vehicle-orders", JSON.stringify(orders));
  window.dispatchEvent(new Event(ORDERS_UPDATED));
}
export function cancelOrder(id: string) {
  const orders = readOrders();
  const current = orders.find((order) => order.id === id);
  if (!current) throw new Error("لم يتم العثور على الطلب");
  if (!["pending", "active"].includes(current.status))
    throw new Error("لا يمكن إلغاء الطلب في حالته الحالية");
  const updated = {
    ...current,
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
  };
  saveOrders(orders.map((order) => (order.id === id ? updated : order)));
  return updated;
}
