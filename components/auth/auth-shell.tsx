import type { ReactNode } from "react";
import { AuthContainer } from "./auth-container";
import { AuthIntroduction } from "./auth-introduction";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <AuthContainer>
      <div className="motion-card relative grid w-full rounded-[29.93px] bg-white/[.03] shadow-[0_33.26px_83.14px_0_#00000029] backdrop-blur-[53.21px] md:min-h-[720px] md:grid-cols-[.45fr_.55fr]">
        <div className="hidden overflow-hidden rounded-r-[29.93px] md:block">
          <AuthIntroduction />
        </div>
        {children}
      </div>
    </AuthContainer>
  );
}
