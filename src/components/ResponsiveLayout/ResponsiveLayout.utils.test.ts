import { getMediaQuery } from "./ResponsiveLayout.utils";

describe("getMediaQuery()", () => {
  test("Should return the right Media Query given a breakpoint map", () => {
    const breakpoint = {
      "max-width": `${1345}px`,
      "min-width": `${123}px`,
      pointer: "coarse",
    };

    expect(getMediaQuery(breakpoint)).toEqual(
      "screen and (max-width: 1345px) and (min-width: 123px) and (pointer: coarse)"
    );
  });
});
