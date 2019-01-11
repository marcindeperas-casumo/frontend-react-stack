import React from "react";
import Flex from "@casumo/cmp-flex";
import JackpotTicker from "Components/JackpotTicker";

export const jackpotTickerClass = "c-game-tile__jackpot-ticker u-padding-vert";

const GameTileJackpot = ({ jackpotInfo }) => {
  return (
    <Flex
      justify="center"
      align="end"
      className="o-ratio__content u-padding-bottom--lg u-padding-horiz"
    >
      <JackpotTicker {...jackpotInfo} className={jackpotTickerClass} />
    </Flex>
  );
};

export default GameTileJackpot;
