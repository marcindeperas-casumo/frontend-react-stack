// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { OthersIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { viewports } from "Storybook/viewports";
import { ListCard } from "./ListCard";

const stories = storiesOf("AccountPage/ListCard", module).addParameters({
  noGlobalDecorator: true,
});
const props = {
  Icon: OthersIcon,
  title: "Active Limits",
  action: {
    label: "See All",
    url: "/player",
  },
};
const Wrapper = ({ children }) => (
  <Flex direction="vertical" className="t-background-grey-0 u-padding--3xlg">
    {children}
  </Flex>
);

stories.add(
  "Default (mobile)",
  () => (
    <Wrapper>
      <ListCard {...props} panelProps={{ roundedTop: true }}>
        mobile content
      </ListCard>
      <ListCard {...props} panelProps={{ roundedBottom: true }}>
        mobile content 2
      </ListCard>
    </Wrapper>
  ),
  viewports.mobile
);
stories.add(
  "Default (tablet)",
  () => (
    <Wrapper>
      <ListCard {...props} panelProps={{ roundedTop: true }}>
        tablet content
      </ListCard>
      <ListCard {...props} panelProps={{ roundedBottom: true }}>
        tablet content 2
      </ListCard>
    </Wrapper>
  ),
  viewports.tablet
);
stories.add(
  "Default (desktop)",
  () => (
    <Wrapper>
      <Flex.Item>
        <ListCard
          {...props}
          panelProps={{ roundedTop: true, roundedBottom: true }}
        >
          desktop content
        </ListCard>
      </Flex.Item>
      <Flex.Item>
        <ListCard
          {...props}
          panelProps={{ roundedTop: true, roundedBottom: true }}
        >
          desktop content 2
        </ListCard>
      </Flex.Item>
    </Wrapper>
  ),
  viewports.desktop
);
