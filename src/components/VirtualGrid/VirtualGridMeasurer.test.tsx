// @flow
import * as React from "react";
import { mount } from "enzyme";
import { VirtualGridMeasurer } from "./VirtualGridMeasurer";
jest.mock("./spacerSizesMap");

const container = {
  width: 600,
  height: 600,
};

describe("VirtualGridMeasurer", () => {
  beforeEach(() => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '() => { width: number; height: number; top: ... Remove this comment to see the full error message
    window.HTMLElement.prototype.getBoundingClientRect = function() {
      // https://github.com/jsdom/jsdom/issues/653#issuecomment-606323844
      return {
        width: parseFloat(this.style.width) || container.width,
        height: parseFloat(this.style.height) || container.height,
        top: parseFloat(this.style.marginTop) || 0,
        left: parseFloat(this.style.marginLeft) || 0,
      };
    };
  });

  test("pases proper meassurements", () => {
    const renderChild = jest.fn(x => (
      <div style={{ width: 100, height: 100 }}>{JSON.stringify(x)}</div>
    ));
    mount(
      <div style={container}>
        <VirtualGridMeasurer spacerSize="sm" tileWidth={100} tileHeight={100}>
          {({ columnWidth, rowHeight, width, cardMargin, columnCount }) =>
            renderChild({
              columnWidth,
              rowHeight,
              width,
              cardMargin,
              columnCount,
            })
          }
        </VirtualGridMeasurer>
      </div>
    );

    expect(renderChild).lastCalledWith({
      cardMargin: 4,
      columnCount: 5,
      columnWidth: 108,
      rowHeight: 108,
      width: 540,
    });
  });
});
