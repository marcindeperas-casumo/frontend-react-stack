// @flow
import React from "react";
import MustDropJackpot from "Components/MustDropJackpot";
import * as A from "Types/apollo";

type Props = {
  jackpots: Array<A.mustDropJackpotsQuery_mustDropJackpots>,
};

export const MustDropJackpotsWidget = ({ jackpots }: Props) => (
  <a
    href="/en/games/must-drop-jackpots"
    className="o-flex--vertical u-width--full u-height--full t-border-r--md u-overflow-hidden"
  >
    {jackpots.map(jackpot => (
      <MustDropJackpot key={jackpot.id} jackpot={jackpot} />
    ))}
  </a>
);
