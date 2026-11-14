import { ServicePage, serviceMetadata } from "@/components/services/service-page";

export const generateMetadata = () => serviceMetadata("website-development");

export default function WebsiteDevelopmentPage() {
  return <ServicePage slug="website-development" />;
}
