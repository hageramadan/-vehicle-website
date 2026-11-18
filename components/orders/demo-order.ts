import type { Order } from "../booking/types";
export const completedDemoOrder: Order = {
  id: "MV-240731",
  isDemo: true,
  vehicle: "سطحة هيدروليك",
  pickup: "حي الملقا، الرياض",
  destination: "طريق خريص، الرياض",
  price: 230,
  date: "08 مايو 2026",
  status: "completed",
  notes: "",
  phone: "+966554839201",
  createdAt: "2026-05-08T07:45:00.000Z",
  distanceKm: 24,
  photoCount: 0,
  provider: { name: "أحمد محمد", rating: 4 },
  pickupPoint: { lat: 24.795, lng: 46.625, label: "حي الملقا، الرياض" },
  destinationPoint: { lat: 24.735, lng: 46.805, label: "طريق خريص، الرياض" },
  timeline: [
    { label: "تم إرسال الطلب", at: "2026-05-08T07:45:00.000Z" },
    { label: "تم قبول الطلب", at: "2026-05-08T07:52:00.000Z" },
    { label: "وصول مقدم الخدمة", at: "2026-05-08T08:18:00.000Z" },
    { label: "جاري سحب الطلب", at: "2026-05-08T08:27:00.000Z" },
    { label: "اكتمال الطلب", at: "2026-05-08T09:05:00.000Z" },
  ],
};

export const cancelledDemoOrder: Order = {
  ...completedDemoOrder,
  id: "MV-240732",
  vehicle: "سطحة عادية",
  price: 180,
  date: "09 مايو 2026",
  status: "cancelled",
  createdAt: "2026-05-09T10:00:00.000Z",
  cancelledAt: "2026-05-09T10:10:00.000Z",
  provider: undefined,
  timeline: [
    { label: "تم إرسال الطلب", at: "2026-05-09T10:00:00.000Z" },
    { label: "تم إلغاء الطلب", at: "2026-05-09T10:10:00.000Z" },
  ],
};

export const activeDemoOrder: Order = {
  ...completedDemoOrder,
  id: "MV-240733",
  price: 250,
  date: "10 مايو 2026",
  status: "active",
  createdAt: "2026-05-10T12:00:00.000Z",
  provider: { name: "محمد عبدالله", rating: 5 },
  timeline: [
    { label: "تم إرسال الطلب", at: "2026-05-10T12:00:00.000Z" },
    { label: "تم قبول الطلب", at: "2026-05-10T12:05:00.000Z" },
    { label: "وصول مقدم الخدمة", at: "2026-05-10T12:25:00.000Z" },
    { label: "جاري سحب الطلب", at: "2026-05-10T12:35:00.000Z" },
  ],
};

export const demoOrders: Order[] = [
  completedDemoOrder,
  cancelledDemoOrder,
  activeDemoOrder,
];
