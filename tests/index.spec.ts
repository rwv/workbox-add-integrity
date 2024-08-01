import addIntegrity from "../src/index.js";
import { expect, test, describe } from "vitest";
import fs from "fs/promises";

describe("workbox-add-integrity", () => {
  test("should transform manifest successfully using sha256", async () => {
    const expectedIntegrity =
      "sha256-8pvGSp03MrS5A1El/bMoX1tkVXeO3KckFGceDKOy4N4=";
    const hashFunction = addIntegrity({ hash: "sha256", folder: "tests" });
    const manifest = [
      {
        url: "example.txt",
        revision: null,
        size: 0,
      },
    ];

    const result = await hashFunction(manifest);
    expect(result.manifest[0].integrity).toBe(expectedIntegrity);
  });

  test("should transform manifest successfully with default options", async () => {
    // mkdir dist and copy example.txt to dist
    await fs.mkdir("dist", { recursive: true });
    await fs.copyFile("tests/example.txt", "dist/example.txt");

    const expectedIntegrity =
      "sha256-8pvGSp03MrS5A1El/bMoX1tkVXeO3KckFGceDKOy4N4=";
    const hashFunction = addIntegrity();
    const manifest = [
      {
        url: "example.txt",
        revision: null,
        size: 0,
      },
    ];

    const result = await hashFunction(manifest);
    expect(result.manifest[0].integrity).toBe(expectedIntegrity);

    // cleanup
    await fs.rm("dist", { recursive: true });
  });
});
