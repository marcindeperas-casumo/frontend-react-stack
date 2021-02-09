// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { OthersIcon } from "@casumo/cmp-icons";
import { viewports } from "Storybook/viewports";
import { Panel } from "./Panel";

const stories = storiesOf("AccountPage/Panel", module).addParameters({
  noGlobalDecorator: true,
});
const props = {
  Icon: OthersIcon,
  title: "Active Limits",
  seeAllLink: {
    label: "See All",
    url: "/player",
  },
};
const Wrapper = ({ children }) => (
  <div className="t-background-grey-0 u-padding--3xlg">{children}</div>
);

stories.add(
  "Default (mobile)",
  () => (
    <Wrapper>
      <Panel {...props} roundedTop>
        mobile content
      </Panel>
      <Panel {...props} roundedBottom>
        mobile content 2
      </Panel>
    </Wrapper>
  ),
  viewports.mobile
);
stories.add(
  "Default (tablet)",
  () => (
    <Wrapper>
      <Panel {...props} roundedTop>
        tablet content
      </Panel>
      <Panel {...props} roundedBottom>
        tablet content 2
      </Panel>
    </Wrapper>
  ),
  viewports.tablet
);
stories.add(
  "Default (desktop)",
  () => (
    <Wrapper>
      <Panel {...props} roundedTop roundedBottom>
        desktop content
      </Panel>
      <Panel {...props} className="u-margin-top" roundedTop roundedBottom>
        desktop content 2
      </Panel>
    </Wrapper>
  ),
  viewports.desktop
);
