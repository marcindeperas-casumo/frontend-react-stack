// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { Desktop } from "Components/ResponsiveLayout";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  return (
    <Flex spacing="none">
      <Desktop>
        <Flex.Item
          style={{ width: "260px" }}
          className="u-position-relative u-height--screen u-overflow-y--auto"
        >
          <div>{/* sidebar goes here */}</div>
        </Flex.Item>
      </Desktop>
      <Flex.Block>
        <div className="u-height--screen">{props.children}</div>
      </Flex.Block>
    </Flex>
  );
};
