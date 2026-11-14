import { EditPage, editMetadata } from "@/components/editorial/edit-page";

export const generateMetadata = () => editMetadata("event-edit");

export default function EventEditPage() {
  return <EditPage slug="event-edit" />;
}
