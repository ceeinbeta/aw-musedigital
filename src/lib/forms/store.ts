import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Where form submissions are kept.
 *
 * In production this is Firestore, reached with the Firebase Admin SDK. On
 * Firebase App Hosting the credentials are provided automatically. Browsers
 * never talk to Firestore directly; firestore.rules denies all client access.
 *
 * On a developer's machine with no Firebase credentials, submissions are
 * written to a local file (.data/store.json, ignored by git) so the forms can
 * be tested end to end. That fallback never runs in production.
 */

export type Doc = Record<string, unknown>;

export interface Store {
  /** Adds a document with a generated ID and returns the ID. */
  add(collection: string, data: Doc): Promise<string>;
  /** Creates or merges a document with a known ID. */
  set(collection: string, id: string, data: Doc): Promise<void>;
  get(collection: string, id: string): Promise<Doc | null>;
  /** Finds the first document whose field equals the value. */
  findOne(collection: string, field: string, value: string): Promise<{ id: string; data: Doc } | null>;
}

export const isFirebaseConfigured = Boolean(
  process.env.FIREBASE_CONFIG || process.env.GOOGLE_APPLICATION_CREDENTIALS,
);

async function firestoreStore(): Promise<Store> {
  const { getApps, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  if (getApps().length === 0) initializeApp();
  const db = getFirestore();
  return {
    async add(collection, data) {
      const ref = await db.collection(collection).add(data);
      return ref.id;
    },
    async set(collection, id, data) {
      await db.collection(collection).doc(id).set(data, { merge: true });
    },
    async get(collection, id) {
      const snapshot = await db.collection(collection).doc(id).get();
      return snapshot.exists ? (snapshot.data() ?? null) : null;
    },
    async findOne(collection, field, value) {
      const result = await db.collection(collection).where(field, "==", value).limit(1).get();
      const doc = result.docs[0];
      return doc ? { id: doc.id, data: doc.data() } : null;
    },
  };
}

const localFile = path.join(process.cwd(), ".data", "store.json");
type LocalData = Record<string, Record<string, Doc>>;

async function readLocal(): Promise<LocalData> {
  try {
    return JSON.parse(await readFile(localFile, "utf8")) as LocalData;
  } catch {
    return {};
  }
}

async function writeLocal(data: LocalData) {
  await mkdir(path.dirname(localFile), { recursive: true });
  await writeFile(localFile, JSON.stringify(data, null, 2));
}

const localStore: Store = {
  async add(collection, data) {
    const id = randomUUID();
    await this.set(collection, id, data);
    return id;
  },
  async set(collection, id, data) {
    const all = await readLocal();
    all[collection] = { ...all[collection], [id]: { ...all[collection]?.[id], ...data } };
    await writeLocal(all);
  },
  async get(collection, id) {
    return (await readLocal())[collection]?.[id] ?? null;
  },
  async findOne(collection, field, value) {
    const entries = Object.entries((await readLocal())[collection] ?? {});
    const match = entries.find(([, data]) => data[field] === value);
    return match ? { id: match[0], data: match[1] } : null;
  },
};

/** Thrown when the live site has nowhere to save submissions. */
export class StoreUnavailableError extends Error {}

export async function getStore(): Promise<Store> {
  if (isFirebaseConfigured) return firestoreStore();
  if (process.env.NODE_ENV !== "production") return localStore;
  throw new StoreUnavailableError("Firestore is not configured.");
}
