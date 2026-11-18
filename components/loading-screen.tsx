import { Logo } from "./header";

export function LoadingScreen() {
  return (
    <div className="min-h-svh" role="status" aria-label="جارٍ تحميل الموقع">
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-primary">
        <div className="animate-[pulse-logo_1.5s_ease-in-out_infinite]">
          <Logo />
        </div>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#c7a451]" />
        </div>
        <p className="text-xs text-slate-400">نجهز لك الطريق...</p>
      </div>
    </div>
  );
}
