"use client";
import { AuthShell } from "./auth-shell";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AccountTypeSelection,
  type AccountKind,
} from "./account-type-selection";
import { SignupForm, type SignupDraft } from "./signup-form";
import { CodeVerification } from "./code-verification";
export function SignupFlow() {
  const router = useRouter();
  const [kind, setKind] = useState<AccountKind | null>(null);
  const [draft, setDraft] = useState<SignupDraft | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  function complete() {
    if (!draft) return;
    try {
      sessionStorage.setItem("vehicle-demo-phone", draft.phone);
      sessionStorage.setItem("vehicle-demo-user", draft.name);
      sessionStorage.setItem("vehicle-demo-account-kind", draft.kind);
      router.push("/booking");
    } catch {
      setError(
        "تعذر إكمال التسجيل التجريبي. تحقق من إتاحة التخزين في المتصفح.",
      );
    }
  }
  if (!kind)
    return (
      <AuthShell>
        <AccountTypeSelection onSelect={setKind} />
      </AuthShell>
    );
  if (verifying && draft)
    return (
      <AuthShell>
        <div className="min-w-0">
          <CodeVerification
            phone={draft.phone}
            onEditPhone={() => {
              setVerifying(false);
              setError("");
            }}
            onConfirm={complete}
          />
          {error && (
            <p role="alert" className="px-6 pb-6 text-xs text-rose-400">
              {error}
            </p>
          )}
        </div>
      </AuthShell>
    );
  return (
    <SignupForm
      key={kind}
      kind={kind}
      initial={draft?.kind === kind ? draft : null}
      onBack={() => setKind(null)}
      onContinue={(value) => {
        setDraft(value);
        setVerifying(true);
      }}
    />
  );
}
