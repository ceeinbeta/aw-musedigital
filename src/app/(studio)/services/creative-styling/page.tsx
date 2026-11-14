import { ServicePage, serviceMetadata } from "@/components/services/service-page";

export const generateMetadata = () => serviceMetadata("creative-styling");

export default function CreativeStylingPage() {
  return <ServicePage slug="creative-styling" />;
}
