import addIntegrity from "./index.js";
import { expect, test, describe } from "vitest";

describe("workbox-add-integrity", () => {
  test("should transform manifest successfully using sha256", async () => {
    const expectedIntegrity =
      "sha256-ThNHoR/aW0V8+EweTXxjqmRN1D4D+xUNGrpBO+uG21M=";
    const hashFunction = addIntegrity({ hash: "sha256", folder: "" });
    const manifest = [
      {
        url: "LICENSE",
        revision: null,
        size: 0,
      },
    ];

    const result = await hashFunction(manifest);
    expect(result.manifest[0].integrity).toBe(expectedIntegrity);
  });
});
