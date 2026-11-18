import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
export const metadata: Metadata = {
  title: "Vehicle Website | العربة المتنقله",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    apple: "/images/logo.png",
  },
  description: "خدمات نقل المركبات والمساعدة على الطريق على مدار الساعة",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

