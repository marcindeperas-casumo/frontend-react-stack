// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { VirtualGrid } from "./VirtualGrid";

describe("VirtualGrid", () => {
  test("Renders required components", () => {
    /**
     * Usualy this would be storybook story, but since it's really generic
     * it makes sense to write test case instead...
     */
    const rendered = mount(
      <MockStore>
        <VirtualGrid
          dataList={[{}, {}, {}, {}]}
          TileComponent={() => <div />}
          spacerSize="sm"
          tileWidth={100}
          tileHeight={100}
        />
      </MockStore>
    );

    expect(rendered.find("VirtualGrid")).toHaveLength(1);
    expect(rendered.find("InfiniteLoader")).toHaveLength(1);
    expect(rendered.find("Grid")).toHaveLength(1);
  });
});
