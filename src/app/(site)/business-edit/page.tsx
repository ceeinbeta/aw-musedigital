import { EditPage, editMetadata } from "@/components/editorial/edit-page";

export const generateMetadata = () => editMetadata("business-edit");

export default function BusinessEditPage() {
  return <EditPage slug="business-edit" />;
}
