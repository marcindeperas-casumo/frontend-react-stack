import { AddIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import React from "react";

import "./BalanceBetSlip.scss";

type Props = {
  t?: {
    balance_title?: string;
    bonus_title?: string;
  };
  maximized: boolean;
  balance: string;
  bonus?: string;
  goToDeposit?: () => void;
};

export const BalanceBetSlip = ({
  t,
  maximized,
  balance,
  bonus,
  goToDeposit = () => {},
}: Props) => (
  <div
    className={cx(
      "c-sports-balance-bet-slip flex fixed z-10 w-full text-white p-2 overflow-hidden h-12 bg-purple-100",
      maximized && "c-sports-balance-bet-slip--maximized"
    )}
  >
    <div
      onClick={goToDeposit}
      className="rounded-full h-8 w-8 flex items-center justify-center bg-purple-80"
    >
      <AddIcon size="sm" />
    </div>
    <div className="px-4">
      <div className="text-xs">{t?.balance_title}</div>
      <div className="font-bold text-sm">{balance}</div>
    </div>
    {bonus && (
      <div className="px-4">
        <div className="text-xs">{t?.bonus_title}</div>
        <div className="font-bold text-sm">{bonus}</div>
      </div>
    )}
  </div>
);
