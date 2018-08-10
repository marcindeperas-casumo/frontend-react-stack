/* @flow */
import React from "react";

import Heading from "@casumo/cmp-heading";

import "./CardData.scss";

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
    <div className="c-card-data t-color-white" {...props}>
      {game.results.length && (
        <div className="c-card-data__results u-padding">
          <div className="c-card-data__results-numbers">
            {game.results.slice(0, max).map((n, i) => (
              <div
                className={`c-card-data__results-number ${getNumberColor(
                  game.type,
                  n
                )} u-padding u-margin-horiz--micro`}
                key={i}
              >
                {isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)}
              </div>
            ))}
          </div>
          <Heading
            className="c-card-data__results-title u-margin-bottom--small u-margin-top--micro"
            text="recent numbers"
            size="milli"
            rank="4"
          />
        </div>
      )}
    </div>
  );
};

export default CardData;
