import React from "react";
import { useSelector } from "react-redux";
import { Deposit } from "Components/Payments/Deposit";
import { Mobile } from "Components/ResponsiveLayout";
import { hasMadeFirstDepositSelector } from "Models/handshake";

export const SportsShellDepositWrapper = () => {
  const hasMadeFirstDeposit = useSelector(hasMadeFirstDepositSelector);

  return (
    <Mobile>
      <div className="pt-sm px-sm">
        <Deposit />
      </div>
    </Mobile>
  );
};
