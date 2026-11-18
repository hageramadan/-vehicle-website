import { useEffect, useState } from "react";
import type { Order } from "../booking/types";
import type { OrderFilter } from "./order-status";
import { readOrders, ORDERS_UPDATED } from "./order-storage";
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    function load() {
      try {
        setOrders(readOrders());
        setError("");
      } catch {
        setError("تعذر قراءة الطلبات المحفوظة في هذا المتصفح.");
      }
      setReady(true);
    }
    load();
    window.addEventListener("storage", load);
    window.addEventListener(ORDERS_UPDATED, load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener(ORDERS_UPDATED, load);
    };
  }, []);
  return {
    filter,
    setFilter,
    ready,
    error,
    visibleOrders: orders.filter(
      (order) =>
        filter === "all" ||
        (filter === "completed"
          ? ["completed", "cancelled"].includes(order.status)
          : order.status === filter),
    ),
  };
}
