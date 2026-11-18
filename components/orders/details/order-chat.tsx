"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronRight, FiSend } from "react-icons/fi";
import { useOrderRecord } from "./use-order-record";
type Message = {
  id: string;
  text: string;
  createdAt: string;
  sender: "customer" | "provider";
};
const staticMessages: Message[] = [
  {
    id: "demo-provider-message",
    text: "لقد وافقت على عرضك.",
    createdAt: "2026-05-08T09:15:00+03:00",
    sender: "provider",
  },
  {
    id: "demo-customer-message",
    text: "شكراً في انتظارك.",
    createdAt: "2026-05-08T09:20:00+03:00",
    sender: "customer",
  },
];
function readMessages(key: string): Message[] {
  const stored = localStorage.getItem(key);
  if (stored === null) return staticMessages;
  const saved: unknown = JSON.parse(stored);
  return Array.isArray(saved)
    ? saved.filter(
        (item): item is Message =>
          item &&
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.createdAt === "string" &&
          ["customer", "provider"].includes(item.sender),
      )
    : [];
}
export function OrderChat({ id }: { id: string }) {
  const { order, ready, error } = useOrderRecord(id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [chatError, setChatError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const key = `vehicle-chat-${id}`;
  useEffect(() => {
    function load() {
      try {
        setMessages(readMessages(key));
        setChatError("");
      } catch {
        setChatError("تعذر قراءة الرسائل المحفوظة.");
      }
      setLoaded(true);
    }
    load();
    function changed(event: StorageEvent) {
      if (event.key === key) load();
    }
    window.addEventListener("storage", changed);
    return () => window.removeEventListener("storage", changed);
  }, [key]);
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);
  function send(event: React.FormEvent) {
    event.preventDefault();
    if (!text.trim() || !order || !loaded || order.status === "cancelled")
      return;
    try {
      const next = [
        ...readMessages(key),
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          createdAt: new Date().toISOString(),
          sender: "customer" as const,
        },
      ];
      localStorage.setItem(key, JSON.stringify(next));
      setMessages(next);
      setText("");
      setChatError("");
    } catch {
      setChatError("تعذر حفظ الرسالة. حاول مرة أخرى.");
    }
  }
  return (
    <main className="container mx-auto flex h-[calc(100dvh-var(--site-header-height))] min-h-0 flex-col pb-[max(16px,env(safe-area-inset-bottom))] pt-5 sm:h-auto sm:min-h-[calc(100svh-var(--site-header-height))] sm:pb-20 sm:pt-16">
      <header className="mb-5 flex shrink-0 items-center sm:mb-8 gap-3">
        <Link
          href={`/orders/${encodeURIComponent(id)}`}
          aria-label="العودة إلى تفاصيل الطلب"
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-[#a0a5bd]"
        >
          <FiChevronRight size={24} />
        </Link>
        <h1 className="text-xl font-extrabold sm:text-2xl">
          {order?.provider?.name || "محادثة الطلب"}
        </h1>
      </header>
      {!ready ? (
        <p role="status" className="py-16 text-center">
          جارٍ تحميل المحادثة...
        </p>
      ) : !order ? (
        <p role="alert" className="py-16 text-center text-[#969bb9]">
          {error || "لم يتم العثور على الطلب في هذا المتصفح."}
        </p>
      ) : (
        <>
          <div
            role="log"
            aria-label="رسائل الطلب"
            aria-live="polite"
            className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain pb-4 sm:min-h-[350px] sm:gap-6 sm:overflow-visible sm:pb-8"
          >
            {loaded && !messages.length && (
              <p className="my-auto text-center text-sm text-[#969bb9]">
                لا توجد رسائل بعد. اكتب رسالتك لبدء المحادثة.
              </p>
            )}
            {messages.map((message, index) => {
              const day = new Date(message.createdAt).toLocaleDateString(
                "ar-EG",
              );
              const previous = index
                ? new Date(messages[index - 1].createdAt).toLocaleDateString(
                    "ar-EG",
                  )
                : null;
              return (
                <div key={message.id}>
                  {day !== previous && (
                    <p className="mb-7 text-center sm:mb-14 text-sm font-semibold text-[#969bb9]">
                      {message.id.startsWith("demo-") ? "اليوم" : day}
                    </p>
                  )}
                  <div
                    className={`w-[80%] rounded-xl px-4 py-3 text-sm sm:w-[38%] ${message.sender === "provider" ? "ml-auto border border-[#e2e3eb] bg-white text-[#454c6b]" : "mr-auto bg-[#3b4265] text-[#dfe0ec]"}`}
                  >
                    <p className="whitespace-pre-wrap [overflow-wrap:anywhere] leading-7">
                      {message.text}
                    </p>
                    <time
                      dateTime={message.createdAt}
                      className={`mt-1 block text-[11px] text-[#969bb9] ${message.sender === "provider" ? "text-right" : "text-left"}`}
                    >
                      {message.id === "demo-provider-message"
                        ? "09:15 ص"
                        : message.id === "demo-customer-message"
                          ? "09:20 ص"
                          : new Date(message.createdAt).toLocaleTimeString(
                              "ar-EG",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                    </time>
                  </div>
                </div>
              );
            })}
            <div ref={bottom} />
          </div>
          {chatError && (
            <p role="alert" className="my-3 text-xs text-rose-300">
              {chatError}
            </p>
          )}
          {order.status === "cancelled" ? (
            <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-[#969bb9]">
              تم إلغاء هذا الطلب. يمكنك الاطلاع على الرسائل السابقة.
            </p>
          ) : (
            <form
              onSubmit={send}
              className="mx-0 mt-3 flex shrink-0 items-center gap-2 sm:mx-5 sm:mt-6 sm:gap-3"
            >
              <input
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxLength={2000}
                aria-label="رسالتك"
                placeholder="اكتب رسالتك..."
                className="min-h-12 min-w-0 flex-1 rounded-xl border border-[#d8dbe8] bg-white px-4 py-3 text-sm text-primary placeholder:text-[#9399b2]"
              />
              <button
                type="submit"
                disabled={!text.trim() || !loaded}
                aria-label="حفظ الرسالة في المحادثة"
                className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#3b4265] text-[#dfe0ec] disabled:cursor-default disabled:opacity-100"
              >
                <FiSend size={19} className="-scale-x-100" />
              </button>
            </form>
          )}
        </>
      )}
    </main>
  );
}
