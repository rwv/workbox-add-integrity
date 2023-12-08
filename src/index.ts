import path from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";

interface ManifestEntry {
  integrity?: string;
  revision: string | null;
  url: string;
}

type ManifestEntryWithSize = ManifestEntry & {
  size: number;
};

type ManifestEntries = Array<ManifestEntryWithSize>;

type ManifestTransform = (
  manifestEntries: Array<ManifestEntryWithSize>,
  compilation?: unknown
) => Promise<ManifestTransformResult> | ManifestTransformResult;

interface ManifestTransformResult {
  manifest: Array<ManifestEntryWithSize>;
  warnings?: Array<string>;
}

export interface AddIntegrityOptions {
  folder?: string;
}

async function addIntegrityRaw(
  manifestEntries: ManifestEntries,
  options?: AddIntegrityOptions
): Promise<ManifestTransformResult> {
  const folder = options?.folder ?? "dist";

  const newManifestEntries = await Promise.all(
    manifestEntries.map((entry) => handleEntry(entry, folder))
  );

  return { manifest: newManifestEntries };
}

async function handleEntry(
  entry: ManifestEntry & {
    size: number;
  },
  folder: string
) {
  const filepath = path.join(folder, entry.url);
  const integrity = await calculateSRI(filepath);
  return {
    ...entry,
    integrity,
  };
}

async function calculateSRI(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  const fileStream = createReadStream(filePath);

  return new Promise<string>((resolve, reject) => {
    fileStream.on("data", (data) => {
      hash.update(data);
    });

    fileStream.on("end", () => {
      const fileHash = hash.digest("base64");
      const sriString = `sha256-${fileHash}`;
      resolve(sriString);
    });

    fileStream.on("error", (error) => {
      reject(error);
    });
  });
}

export default function addIntegrity(
  options?: AddIntegrityOptions
): ManifestTransform {
  return (manifestEntries: ManifestEntries) =>
    addIntegrityRaw(manifestEntries, options);
}
