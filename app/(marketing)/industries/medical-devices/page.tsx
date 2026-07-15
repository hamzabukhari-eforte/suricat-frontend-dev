import { MedicalDevicesContent } from "@/components/sections/industries/MedicalDevicesContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.medicalDevices;

export default function MedicalDevicesPage() {
  return <MedicalDevicesContent />;
}
