import * as React from "react";
import Flex from "@casumo/cmp-flex";

export const ReelRacesDrawer = () => {
  return (
    <Flex
      className="u-height--5xlg u-padding-top--md u-padding-x--xlg t-background-grey-90 t-color-white u-font"
      direction="horizontal"
      spacing="md"
    >
      <Flex.Block>
        <Flex.Item>checkerd flag 1 </Flex.Item>
        <Flex.Item>Progress Bar</Flex.Item>
        <Flex.Item>checkerd Flag 2</Flex.Item>
      </Flex.Block>
      <Flex.Block>
        <Flex.Item>col 1</Flex.Item>
        <Flex.Item>col 2 Absolute Positioned</Flex.Item>
        <Flex.Item>col 3</Flex.Item>
      </Flex.Block>
    </Flex>
  );
};
