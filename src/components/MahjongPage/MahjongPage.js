import React from "react";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import { ComponentBuilder } from "Components/ComponentBuilder";

// const ComponentBuilder = React.lazy(() =>
//   import("Components/ComponentBuilder").then(module => ({
//     default: module.ComponentBuilder,
//   }))
// );

export const MahjongPage = () => (
  <WaitForHostElement hostElementId="react-host-mahjong">
    <Portal hostElementId="react-host-mahjong">
      <ComponentBuilder slug="built-pages.mahjong" />
    </Portal>
  </WaitForHostElement>
);
