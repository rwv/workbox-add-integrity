import addIntegrity from "./index.js";
import { expect, test, describe } from "vitest";

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
});
