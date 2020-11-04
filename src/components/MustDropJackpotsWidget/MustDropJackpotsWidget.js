// @flow
import React from "react";
import { Link } from "@reach/router";
import { MustDropJackpot } from "Components/MustDropJackpot";
import * as A from "Types/apollo";

type Props = {
  jackpots: Array<A.MustDropJackpotsWidget_MustDropJackpot>,
};

export const MustDropJackpotsWidget = ({ jackpots }: Props) => (
  <Link
    to="../must-drop-jackpots"
    className="o-flex--vertical u-width--full u-height--full t-border-r--md u-overflow--hidden"
  >
    {jackpots.map(jackpot => (
      <MustDropJackpot key={jackpot.id} jackpot={jackpot} />
    ))}
  </Link>
);
