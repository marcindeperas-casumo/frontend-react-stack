import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import LazyPortalContainer from "Components/LazyPortal";
import LazyPortal from "Components/LazyPortal/LazyPortal";
import MockStore from "Components/MockStore";
import GameListSkeleton from "Components/GameList/GameListSkeleton";

const stories = storiesOf("LazyPortal", module);
const listId = "popularGames";
const hostElementId = "portal-host-element";

stories.add(
  "LazyPortal (Connected)",
  () => (
    <MockStore>
      <LazyPortalContainer
        hostElementId={hostElementId}
        fallback={<GameListSkeleton itemWidth={170} />}
        loader={() => import("Components/GameList")}
        props={{
          id: listId,
        }}
      />
    </MockStore>
  ),
  info({
    text: `Renders a component into a DOM node lazily. Waits for the host-element to be available before
    doing the rendering. It is possible to pass down props to the lazy-loaded component and also
    to show a fallback component based on the state.`,
  })
);

stories.add(
  "LazyPortal (Private)",
  () => (
    <MockStore>
      <LazyPortal
        hostElementId={hostElementId}
        showFallback={false}
        fallback={<GameListSkeleton itemWidth={170} />}
        loader={() => import("Components/GameList")}
        props={{
          id: listId,
        }}
      />
    </MockStore>
  ),
  info({
    text: `Renders a component into a DOM node lazily. Waits for the host-element to be available before
        doing the rendering. It is possible to pass down props to the lazy-loaded component and also
        to show a fallback component.`,
  })
);
