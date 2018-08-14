/* @flow */
import React from "react";

import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";

import { getRouletteColor, getDreamCatcherColor } from "./utils";

type Props = {
  className?: string,
  /** lobby game data */
  game: {},
  /** maximum result numbers to show */
  max: number,
};

const getNumberColor = (type, n) => {
  if (type === "MoneyWheel") return getDreamCatcherColor(n);
  if (type === "Roulette") return getRouletteColor(n);
};

const CardData = ({ className, game, max = 5, ...props }: Props) => {
  return (
    game.results.length && (
      <div className="o-flex--vertical o-flex-align--center o-flex-justify--end u-width--1/1 u-font-weight-bold">
        <div className="o-layout o-layout--gap u-margin-bottom">
          {game.results.slice(0, max).map((n, i) => {
            const color = getNumberColor(game.type, n);
            return (
              <Badge
                key={i}
                tag="div"
                bgColor={color}
                txtColor={color === "yellow" ? "grey-dark-3" : "white"}
                circle={true}
              >
                {isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)}
              </Badge>
            );
          })}
        </div>
        <Text
          className="t-color-white u-margin-bottom--normal u-font-weight-bold"
          size="xs"
        >
          RECENT NUMBERS
        </Text>
      </div>
    )
  );
};

export default CardData;
