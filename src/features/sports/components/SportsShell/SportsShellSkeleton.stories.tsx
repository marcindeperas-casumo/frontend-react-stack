import { storiesOf } from "@storybook/react";
import React from "react";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";

const stories = storiesOf("Sports/SportsShellSkeleton", module);

stories.add("Mobile", () => (
  <div className="c-sports-shell--mobile">
    <KambiClientSkeleton />
  </div>
));

stories.add("Site", () => (
  <div className="c-sports-shell--site">
    <KambiClientSkeleton />
  </div>
));
