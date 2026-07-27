import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LoginForm } from "@/components/sections/forms/LoginForm";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("login");
}

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <LoginForm />
      <SiteFooter />
    </>
  );
}
