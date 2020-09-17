import * as React from "react";
import Flex from "@casumo/cmp-flex";
import "./ReelRacesDrawer.scss";

export const ReelRacesDrawer = () => {
  return (
    <Flex
      className="u-position-fixed u-inset-x u-margin--auto t-background-grey-90 t-color-white u-font u-padding t-background-grey-90 t-border-r u-width--2/3 o-flex--wrap"
      direction="horizontal"
      spacing="md"
    >
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full"
      >
        <Flex.Item className="checkeredFlag"></Flex.Item>
        <Flex.Item className="progressBar t-background-grey-70 u-width--3/4 t-border-r u-height--sm">
          <div className="highlightedProgressBar t-background-teal-50"></div>
        </Flex.Item>
        <Flex.Item className="checkeredFlag"></Flex.Item>
      </Flex>
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full"
      >
        <Flex.Item>
          <span></span>
          {/* <span>{position}</span> */}
        </Flex.Item>
        <Flex.Item>
          <span></span>
        </Flex.Item>
        <Flex.Item>
          {/* <span>{points}</span> */}
          <span>pts</span>
        </Flex.Item>
      </Flex>
    </Flex>
  );
};
