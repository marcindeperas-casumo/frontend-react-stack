// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { TabletAndDesktop } from "Components/ResponsiveLayout";
import Sidebar from "Components/Sidebar";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  return (
    <Flex spacing="none">
      <TabletAndDesktop>
        <Flex.Item
          style={{ width: "260px" }}
          className="u-position-relative u-height--screen u-overflow-y--auto"
        >
          <Sidebar />
        </Flex.Item>
      </TabletAndDesktop>
      <Flex.Block>
        <div className="u-height--screen">{props.children}</div>
      </Flex.Block>
    </Flex>
  );
};
