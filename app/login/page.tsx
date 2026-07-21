import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LoginForm } from "@/components/sections/forms/LoginForm";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.login;

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <LoginForm />
      <SiteFooter />
    </>
  );
}
