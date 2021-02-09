// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import { AccountPage } from "./AccountPage";

const stories = storiesOf("AccountPage", module).addParameters({
  noGlobalDecorator: true,
});
const renderAccountPage = () => {
  return (
    <div className="u-width--screen u-height--screen">
      <AccountPage />
    </div>
  );
};

stories.add("Default (mobile)", renderAccountPage, viewports.mobile);

stories.add("Default (tablet)", renderAccountPage, viewports.tablet);

stories.add("Default (desktop)", renderAccountPage, viewports.desktop);
