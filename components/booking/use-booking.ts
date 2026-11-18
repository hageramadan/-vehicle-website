"use client";
import { useEffect, useRef, useState } from "react";
import { saveOrderPhotos } from "../orders/order-photos-storage";
import { readOrders, saveOrders } from "../orders/order-storage";
import { normalizePhone } from "../phone-utils";
import { vehicles } from "../vehicle-cards";
import type { Order, LocationPoint } from "./types";

export function useBooking() {
  const saving = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("standard");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupPoint, setPickupPoint] = useState<LocationPoint | null>(null);
  const [destinationPoint, setDestinationPoint] =
    useState<LocationPoint | null>(null);
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [accountPhone, setAccountPhone] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [photo, setPhoto] = useState<File[]>([]);
  useEffect(() => {
    const savedPhone = sessionStorage.getItem("vehicle-demo-phone") || "";
    setAccountPhone(savedPhone);
    setPhone(savedPhone);
    const v = new URLSearchParams(window.location.search).get("vehicle");
    if (vehicles.some((x) => x.id === v)) setSelected(v!);
  }, []);
  const vehicle = vehicles.find((x) => x.id === selected)!;
  function locate() {
    setError("");
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPickupPoint({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          label: `${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`,
        });
        setPickup(
          `${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`,
        );
      },
      () => setError("تعذر تحديد الموقع. أدخل العنوان يدويًا."),
    );
  }
  async function next() {
    setError("");
    if (step === 1 && phone.trim()) setPhone(normalizePhone(phone));
    if (step === 2) {
      if (saving.current) return;
      saving.current = true;
      setSubmitting(true);
      const id = `VW-${Date.now().toString().slice(-7)}`;
      const order: Order = {
        id,
        vehicle: vehicle.name,
        pickup,
        pickupPoint: pickupPoint || undefined,
        destinationPoint: destinationPoint || undefined,
        destination,
        notes,
        phone,
        createdAt: new Date().toISOString(),
        photoCount: photo.length,
        price: vehicle.price,
        date: new Date().toLocaleDateString("ar-SA"),
        status: "pending",
      };
      try {
        if (photo.length) await saveOrderPhotos(id, photo);
        saveOrders([order, ...readOrders()]);
        setOrderId(id);
      } catch {
        setError(
          "تعذر حفظ الطلب على هذا المتصفح. تحقق من إتاحة التخزين المحلي.",
        );
        return;
      } finally {
        saving.current = false;
        setSubmitting(false);
      }
    }
    setStep(step + 1);
  }
  return {
    step,
    submitting,
    selected,
    pickup,
    destination,
    notes,
    phone,
    error,
    orderId,
    photo,
    accountPhone,
    vehicle,
    pickupPoint,
    destinationPoint,
    setPickupPoint,
    setDestinationPoint,
    setSelected,
    setPickup,
    setDestination,
    setNotes,
    setPhone,
    setPhoto,
    locate,
    next,
    previous: () => setStep(Math.max(0, step - 1)),
    changeVehicle: () => setStep(0),
    editTrip: () => setStep(1),
  };
}
