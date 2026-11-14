import { ServicePage, serviceMetadata } from "@/components/services/service-page";

export const generateMetadata = () => serviceMetadata("event-planning");

export default function EventPlanningPage() {
  return <ServicePage slug="event-planning" />;
}
