import { storiesOf } from "@storybook/react";
import * as React from "react";

// import { viewports } from "Storybook/viewports";

const viewports = { mobile: null, desktop: null, tablet: null, phablet: null };
import { Header } from "./Header";

const stories = storiesOf("AccountPage/Header", module);

stories.add(
  "Default (mobile)",
  () => <Header>some header</Header>,
  viewports.mobile
);

stories.add(
  "Default (tablet)",
  () => <Header>some header</Header>,
  viewports.tablet
);

stories.add(
  "Default (desktop)",
  () => <Header>some header</Header>,
  viewports.desktop
);
