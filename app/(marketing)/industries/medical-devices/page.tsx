import { MedicalDevicesContent } from "@/components/sections/industries/MedicalDevicesContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("medicalDevices");
}

export default function MedicalDevicesPage() {
  return <MedicalDevicesContent />;
}
