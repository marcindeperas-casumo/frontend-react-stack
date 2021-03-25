import React from "react";
import { useSelector } from "react-redux";
import { Deposit } from "Components/Payments/Deposit";
import { Mobile } from "Components/ResponsiveLayout";
import { hasMadeFirstDepositSelector } from "Models/handshake";

export const SportsShellDepositWrapper = () => {
  const hasMadeFirstDeposit = useSelector(hasMadeFirstDepositSelector);

  return hasMadeFirstDeposit ? (
    <Mobile>
      <div className="u-padding-top--md u-padding-x--md">
        <Deposit />
      </div>
    </Mobile>
  ) : null;
};
