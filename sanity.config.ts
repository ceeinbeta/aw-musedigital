import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

/** Configuration for the editing screen served at /studio. */
export default defineConfig({
  name: "muse-digital",
  title: "MUSE DIGITAL",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
