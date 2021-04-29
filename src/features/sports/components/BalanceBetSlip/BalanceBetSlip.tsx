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
      "c-sports-balance-bet-slip flex fixed z-modal w-full text-white p-sm overflow-hidden h-3xlg bg-purple-100",
      maximized && "c-sports-balance-bet-slip--maximized"
    )}
  >
    <div
      onClick={goToDeposit}
      className="rounded-full h-2xlg w-2xlg flex items-center justify-center bg-purple-80"
    >
      <AddIcon size="sm" />
    </div>
    <div className="px-md pt-sm">
      <div className="text-xs">{t?.balance_title}</div>
      <div className="font-bold">{balance}</div>
    </div>
    {bonus && (
      <div className="px-md pt-sm">
        <div className="text-xs">{t?.bonus_title}</div>
        <div className="font-bold">{bonus}</div>
      </div>
    )}
  </div>
);
