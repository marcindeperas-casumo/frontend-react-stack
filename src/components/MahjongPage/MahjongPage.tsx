import React from "react";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import { ComponentBuilder } from "Components/ComponentBuilder";
import { Deposit } from "Components/Payments/Deposit";
import {
  topMarginClasses,
  xPaddingClasses,
} from "Components/GameListHorizontal/constants";
import { Mobile } from "Components/ResponsiveLayout";

export const MahjongPage = () => (
  <WaitForHostElement hostElementId="react-host-mahjong">
    <Portal hostElementId="react-host-mahjong">
      <div>
        <Mobile>
          <div className={`${xPaddingClasses} ${topMarginClasses}`}>
            <Deposit />
          </div>
        </Mobile>
        <div className="u-padding-top--3xlg@desktop">
          <ComponentBuilder slug="built-pages.mahjong" />
        </div>
      </div>
    </Portal>
  </WaitForHostElement>
);
