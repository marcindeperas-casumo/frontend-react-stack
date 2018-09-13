import React from "react";
import Flex from "@casumo/cmp-flex";
import JackpotTicker from "../../components/JackpotTicker";

export const jackpotTickerClass =
  "c-jackpot-ticker u-margin-bottom--normal u-padding-horiz--small u-padding-vert";

const GameTileJackpot = ({ jackpotInfo }) => {
  return (
    <Flex justify="center" align="end" className="o-ratio__content">
      <JackpotTicker {...jackpotInfo} className={jackpotTickerClass} />
    </Flex>
  );
};

export default GameTileJackpot;
