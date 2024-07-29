import { expect, test, describe } from "vitest";
import { calculateSRI } from "../src/calculate-SRI.js";

describe("calculate SRI", () => {
  test("should calculate the SRI for a file using sha256", async () => {
    const expectedHash = "8pvGSp03MrS5A1El/bMoX1tkVXeO3KckFGceDKOy4N4=";
    const sri = await calculateSRI("./tests/example.txt", "sha256");
    expect(sri).toBe(`sha256-${expectedHash}`);
  });

  test("should calculate the SRI for a file using sha384", async () => {
    const expectedHash =
      "rl3ZV1kKuG/XNZ9D7LaLhzTVASccotOVO3IJ7WOpjfuGz2bixYSMwkcavdgFeGcK";
    const sri = await calculateSRI("./tests/example.txt", "sha384");
    expect(sri).toBe(`sha384-${expectedHash}`);
  });

  test("should calculate the SRI for a file using sha512", async () => {
    const expectedHash =
      "sd8ha1sF45ZcRpSSdEpd4MlF4LEDxC6x5XR2++2PHUifXK6beS2zfF2CO8DGx9BrBWF21qvlzgdu6trtQU4Xow==";
    const sri = await calculateSRI("./tests/example.txt", "sha512");
    expect(sri).toBe(`sha512-${expectedHash}`);
  });
});
