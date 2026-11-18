import { AuthShell } from "./auth/auth-shell";
import { LoginForm } from "./auth/login-form";

export function Login() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
