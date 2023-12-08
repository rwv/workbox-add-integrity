import path from "path";
import { calculateSRI } from "./calculate-SRI.js";
import type {
  ManifestEntries,
  ManifestEntryWithSize,
  ManifestTransform,
  ManifestTransformResult,
} from "./types.js";

export interface AddIntegrityOptions {
  folder?: string;
  hash?: "sha256" | "sha384" | "sha512";
}

export const DEFAULT_OPTIONS = {
  folder: "dist",
  hash: "sha256",
} as const;

async function handleEntry(
  entry: ManifestEntryWithSize,
  options?: AddIntegrityOptions
) {
  const folder = options?.folder ?? DEFAULT_OPTIONS.folder;
  const hash = options?.hash ?? DEFAULT_OPTIONS.hash;

  const filepath = path.join(folder, entry.url);
  const integrity = await calculateSRI(filepath, hash);
  return {
    ...entry,
    integrity,
  };
}

async function addIntegrityRaw(
  manifestEntries: ManifestEntries,
  options?: AddIntegrityOptions
): Promise<ManifestTransformResult> {
  const newManifestEntries = await Promise.all(
    manifestEntries.map((entry) => handleEntry(entry, options))
  );

  return { manifest: newManifestEntries };
}


export default function addIntegrity(
  options?: AddIntegrityOptions
): ManifestTransform {
  return (manifestEntries: ManifestEntries) =>
    addIntegrityRaw(manifestEntries, options);
}
