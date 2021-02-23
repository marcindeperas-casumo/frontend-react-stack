// @flow
import React from "react";
import { Link } from "@reach/router";
import { MustDropJackpot } from "Components/MustDropJackpot";
import * as A from "Types/apollo";
import { topListWidgetWidth } from "Src/constants";

type Props = {
  jackpots: Array<A.MustDropJackpotsWidget_MustDropJackpot>,
};

export const MustDropJackpotsWidget = ({ jackpots }: Props) => (
  <Link
    to="../must-drop-jackpots"
    className="o-flex--vertical t-border-r--md u-overflow--hidden t-background-grey-90 u-padding-y"
    style={{ width: topListWidgetWidth }}
  >
    {jackpots.map(jackpot => (
      <MustDropJackpot key={jackpot.id} jackpot={jackpot} />
    ))}
  </Link>
);
