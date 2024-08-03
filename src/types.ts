export interface ManifestEntry {
  integrity?: string;
  revision: string | null;
  url: string;
}

export type ManifestEntryWithSize = ManifestEntry & {
  size: number;
};

export type ManifestEntries = Array<ManifestEntryWithSize>;

export type ManifestTransform = (
  manifestEntries: Array<ManifestEntryWithSize>,
  compilation?: unknown,
) => Promise<ManifestTransformResult> | ManifestTransformResult;

export interface ManifestTransformResult {
  manifest: Array<ManifestEntryWithSize>;
  warnings?: Array<string>;
}
