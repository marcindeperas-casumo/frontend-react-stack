import { storiesOf } from "@storybook/react";
import React from "react";
import Portal from "Components/Portal";
import { WaitForHostElement } from "Components/WaitForHostElement";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";

const stories = storiesOf("Portal", module);
const hostElementId = "portal-host-element";
const HelloSampleComponent = () => (
  <div>Hello, this is a sample component.</div>
);

stories.add("Portal", () => (
  // We need to wait until the host element appears in the DOM
  <WaitForHostElement hostElementId={hostElementId}>
    <Portal hostElementId={hostElementId}>
      <HelloSampleComponent />
    </Portal>
  </WaitForHostElement>
));

stories.add("Portal (with fallback)", () => (
  // We need to wait until the host element appears in the DOM
  <WaitForHostElement hostElementId={hostElementId}>
    <Portal
      hostElementId={hostElementId}
      showFallback={true}
      fallback={<GameListHorizontalSkeleton itemWidth={170} />}
    >
      <HelloSampleComponent />
    </Portal>
  </WaitForHostElement>
));
