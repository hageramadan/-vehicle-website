import type { ReactNode } from "react";

export function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-8 md:px-0 md:py-12">
      <div className="mx-auto w-full max-w-[1277.04px]">{children}</div>
    </main>
  );
}
