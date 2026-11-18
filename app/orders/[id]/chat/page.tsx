import { OrderChat } from "@/components/orders/details/order-chat";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderChat id={id} />;
}
