import React from "react";
import { Deposit } from "Components/Payments/Deposit";
import { Mobile } from "Components/ResponsiveLayout";

export const SportsShellDepositWrapper = () => (
  <Mobile>
    <div className="pt-sm px-sm">
      <span>Hello</span>
      <Deposit />
    </div>
  </Mobile>
);
