import { EditPage, editMetadata } from "@/components/editorial/edit-page";

export const generateMetadata = () => editMetadata("style-edit");

export default function StyleEditPage() {
  return <EditPage slug="style-edit" />;
}
