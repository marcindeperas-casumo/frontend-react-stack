import { storiesOf } from "@storybook/react";
import React from "react";
import SportsShellSkeleton from "./SportsShellSkeleton";

const stories = storiesOf("Sports/SportsShellSkeleton", module);

stories.add("Mobile", () => (
  <div className="c-sports-shell--mobile">
    <SportsShellSkeleton />
  </div>
));

stories.add("Site", () => (
  <div className="c-sports-shell--site">
    <SportsShellSkeleton />
  </div>
));
