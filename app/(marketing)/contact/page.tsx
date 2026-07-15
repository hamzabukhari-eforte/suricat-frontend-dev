import { ContactContent } from "@/components/sections/contact/ContactContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.contact;

export default function ContactPage() {
  return <ContactContent />;
}
