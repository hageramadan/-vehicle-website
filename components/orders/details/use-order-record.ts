import { useEffect, useState } from "react";
import type { Order } from "../../booking/types";
import { readOrders, ORDERS_UPDATED } from "../order-storage";
export function useOrderRecord(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    function load() {
      try {
        setOrder(readOrders().find((item) => item.id === id) || null);
        setError("");
      } catch {
        setError("تعذر قراءة بيانات الطلب.");
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
  }, [id]);
  return { order, setOrder, ready, error };
}
