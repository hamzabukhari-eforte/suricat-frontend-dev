import {
  LoginForm,
  LoginSlimHeader,
} from "@/components/sections/forms/LoginForm";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.login;

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LoginSlimHeader />
      <LoginForm />
    </div>
  );
}
