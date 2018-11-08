import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import Portal from "Components/Portal";
import WaitForHostElement from "Components/WaitForHostElement";
import GameListSkeleton from "Components/GameList/GameListSkeleton";
import MockStore from "Components/MockStore";

const stories = storiesOf("Portal", module);
const hostElementId = "portal-host-element";
const HelloSampleComponent = () => (
  <div>Hello, this is a sample component.</div>
);

stories.add(
  "Portal",
  () => (
    <>
      <MockStore>
        {/* We need to wait until the host element appears in the DOM */}
        <WaitForHostElement hostElementId={hostElementId}>
          <Portal hostElementId={hostElementId}>
            <HelloSampleComponent />
          </Portal>
        </WaitForHostElement>
      </MockStore>
    </>
  ),
  info({ text: "Renders children into a specific DOM node." })
);

stories.add(
  "Portal (with fallback)",
  () => (
    <>
      <MockStore>
        {/* We need to wait until the host element appears in the DOM */}
        <WaitForHostElement hostElementId={hostElementId}>
          <Portal
            hostElementId={hostElementId}
            showFallback={true}
            fallback={<GameListSkeleton itemWidth={170} />}
          >
            <HelloSampleComponent />
          </Portal>
        </WaitForHostElement>
      </MockStore>
    </>
  ),
  info({ text: "Shows a fallback until the 'showFallback' prop is true." })
);
