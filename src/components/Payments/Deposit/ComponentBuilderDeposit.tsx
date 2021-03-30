import React from "react";
import { Deposit } from "Components/Payments/Deposit";
import {
  topMarginClasses,
  xPaddingClasses,
} from "Components/GameListHorizontal/constants";
import { Mobile } from "Components/ResponsiveLayout";

export const ComponentBuilderDeposit = () => {
  return (
    <Mobile>
      <div className={`${xPaddingClasses} ${topMarginClasses}`}>
        <Deposit />
      </div>
    </Mobile>
  );
};
