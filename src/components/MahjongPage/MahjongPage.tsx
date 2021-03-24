import React from "react";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import { ComponentBuilder } from "Components/ComponentBuilder";
import { Deposit } from "Components/Payments/Deposit";

export const MahjongPage = () => (
  <WaitForHostElement hostElementId="react-host-mahjong">
    <Portal hostElementId="react-host-mahjong">
      <div>
        <div>
          <Deposit />
        </div>
        <div className="u-padding-top--3xlg@desktop">
          <ComponentBuilder slug="built-pages.mahjong" />
        </div>
      </div>
    </Portal>
  </WaitForHostElement>
);
