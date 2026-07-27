import { ContactContent } from "@/components/sections/contact/ContactContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("contact");
}

export default function ContactPage() {
  return <ContactContent />;
}
