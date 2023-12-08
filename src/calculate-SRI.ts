import { createHash } from "crypto";
import { createReadStream } from "fs";

export async function calculateSRI(
  filePath: string,
  algorithm: "sha256" | "sha384" | "sha512"
): Promise<string> {
  const hash = createHash(algorithm);
  const fileStream = createReadStream(filePath);

  return new Promise<string>((resolve, reject) => {
    fileStream.on("data", (data) => {
      hash.update(data);
    });

    fileStream.on("end", () => {
      const fileHash = hash.digest("base64");
      const sriString = `${algorithm}-${fileHash}`;
      resolve(sriString);
    });

    fileStream.on("error", (error) => {
      reject(error);
    });
  });
}
