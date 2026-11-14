import type { SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { author, collection, product, tag } from "./documents";

export const schemaTypes: SchemaTypeDefinition[] = [article, product, collection, author, tag];
