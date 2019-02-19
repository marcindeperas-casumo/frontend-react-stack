import React from "react";

import { BetslipVisibleQuery } from "Features/sports/state";

const Betslip = () => (
  <BetslipVisibleQuery>
    {({ betslipVisible }) => (
      <div
        className="c-betslip-container"
        style={{ display: betslipVisible ? "initial" : "none" }}
      >
        <div className="c-betslip-container--unpinned" />
        <div className="c-betslip-container--pinned" />
      </div>
    )}
  </BetslipVisibleQuery>
);

export default Betslip;
