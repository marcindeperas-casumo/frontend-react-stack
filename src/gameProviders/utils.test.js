import { expandIframeHeightToMatchItsParent } from "./utils";

const createIframeModel = () => ({
  current: {
    style: {
      height: 0,
      width: 0,
    },
    parentNode: {
      clientHeight: 100,
      clientWidth: 200,
    },
  },
});

describe("Game providers utils", () => {
  test("should set iframe size to fits it's parent size", () => {
    const iframe = createIframeModel();
    expandIframeHeightToMatchItsParent(iframe);

    expect(iframe.current.style.height).toEqual("100px");
    expect(iframe.current.style.width).toEqual("200px");
  });
});
