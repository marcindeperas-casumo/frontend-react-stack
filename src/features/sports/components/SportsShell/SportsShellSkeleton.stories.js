/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SportsShellSkeleton from "./SportsShellSkeleton";

const stories = storiesOf("Sports/SportsShellSkeleton", module);

stories.add(
  "Mobile",
  () => (
    <div className="c-sports-shell--mobile">
      <SportsShellSkeleton />
    </div>
  ),
  info("Mobile")
);

stories.add(
  "Site",
  () => (
    <div className="c-sports-shell--site">
      <SportsShellSkeleton />
    </div>
  ),
  info("Site")
);
