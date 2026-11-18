"use client";
import { OrdersHeader } from "./orders/orders-header";
import { OrdersFilters } from "./orders/orders-filters";
import { OrderCard } from "./orders/order-card";
import { OrdersEmpty } from "./orders/orders-empty";
import { useOrders } from "./orders/use-orders";
export function Orders() {
  const { filter, setFilter, ready, error, visibleOrders } = useOrders();
  return (
    <main className="container mx-auto min-h-[calc(100svh-var(--site-header-height))] py-8 sm:py-16">
      <OrdersHeader />
      <OrdersFilters value={filter} onChange={setFilter} />
      {error && (
        <p role="alert" className="mb-5 text-sm text-rose-300">
          {error}
        </p>
      )}
      {!ready ? (
        <div role="status" aria-label="جارٍ تحميل الطلبات" className="space-y-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      ) : visibleOrders.length ? (
        <div className="motion-stagger space-y-4">
          {visibleOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <OrdersEmpty />
      )}
    </main>
  );
}
