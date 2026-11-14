import { EditPage, editMetadata } from "@/components/editorial/edit-page";

export const generateMetadata = () => editMetadata("living-edit");

export default function LivingEditPage() {
  return <EditPage slug="living-edit" />;
}
