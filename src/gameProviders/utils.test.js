//@flow
import { expandElementHeightToMatchItsParent } from "./utils";

describe("Game providers utils", () => {
  test("should set iframe size to fits it's parent size", () => {
    const gameRef = {
      current: (document.createElement("iframe"): HTMLIFrameElement),
    };

    expandElementHeightToMatchItsParent(gameRef);

    //expecting 0px as unmounted element will always have 0 width/height
    expect(gameRef.current.style.height).toEqual("0px");
    expect(gameRef.current.style.width).toEqual("0px");
  });
});
