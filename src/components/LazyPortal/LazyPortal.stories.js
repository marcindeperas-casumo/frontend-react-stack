// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import LazyPortal from "Components/LazyPortal/LazyPortal";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";

const stories = storiesOf("LazyPortal", module);
const hostElementId = "portal-host-element";

stories.add(
  "LazyPortal",
  () => (
    <LazyPortal
      hostElementId={hostElementId}
      fallback={<GameListHorizontalSkeleton itemWidth={170} />}
      loader={() => import("Components/DangerousHtml")}
      html="<div>Sample lazy-loaded HTML.</div>"
      namedExport="DangerousHtml"
    />
  ),
  {
    info: {
      text: `Renders a component into a DOM node lazily. Waits for the host-element to be available before
        doing the rendering. It is possible to pass down props to the lazy-loaded component and also
        to show a fallback component.`,
    },
  }
);
