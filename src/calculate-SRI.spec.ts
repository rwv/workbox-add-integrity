import { expect, test, describe } from "vitest";
import { calculateSRI } from "./calculate-SRI.js";

describe("calculate SRI", () => {
  test("should calculate the SRI for a file using sha256", async () => {
    const expectedHash = "ThNHoR/aW0V8+EweTXxjqmRN1D4D+xUNGrpBO+uG21M=";
    const sri = await calculateSRI("./LICENSE", "sha256");
    expect(sri).toBe(`sha256-${expectedHash}`);
  });

  test("should calculate the SRI for a file using sha384", async () => {
    const expectedHash =
      "+hvp6h9+NLZ6Q6vG8464M77MRZiCTYdpTkLa9n3Gvz4ZpV/mn7sT7Zz4L3KiIrIh";
    const sri = await calculateSRI("./LICENSE", "sha384");
    expect(sri).toBe(`sha384-${expectedHash}`);
  });

  test("should calculate the SRI for a file using sha512", async () => {
    const expectedHash =
      "g5TXBvsKlG8gUmz/IhCP/BfJWy4vjv65opx1aFciunLGOZX4swbaFkPjPibpkVAlVL2Hus3vsYKv0BMHUCjfzA==";
    const sri = await calculateSRI("./LICENSE", "sha512");
    expect(sri).toBe(`sha512-${expectedHash}`);
  });
});
