/* @flow */
import React from "react";
import classNames from "classnames";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import CMSField from "../CMSField";
import Matcher from "../Matcher";

import { getDreamCatcherColor, getRouletteColor } from "./utils";

import "./CardData.scss";

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

const renderResults = ({ game }) => (
  <React.Fragment>
    <div className="o-layout o-layout--gap u-margin-bottom">
      {game.results.slice(0, 5).map((n, i) => {
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
    <CMSField
      slug="mobile.live-casino-cards-content"
      field="recent_numbers"
      view={text => (
        <Text
          size="xs"
          className="t-color-white u-margin-bottom--small u-font-weight-bold u-text-transform-uppercase"
        >
          {text}
        </Text>
      )}
    />
  </React.Fragment>
);

const renderSeats = ({ game }) => (
  <React.Fragment>
    <Badge
      className={classNames(!game.seats && "u-width--2/3", "u-margin-bottom")}
      tag="div"
      bgColor="green"
      txtColor="white"
      circle={!!game.seats}
    >
      {game.seats || (
        <CMSField
          slug="mobile.live-casino-cards-content"
          field="bet_behind"
          view={Text}
        />
      )}
    </Badge>
    <Text className="t-color-white u-margin-bottom--small u-font-weight-bold u-text-transform-uppercase">
      {game.seats ? (
        <CMSField
          slug="mobile.live-casino-cards-content"
          field="open_seats"
          view={text => (
            <Text size="xs" tag="span">
              {text}
            </Text>
          )}
        />
      ) : (
        <CMSField
          slug="mobile.live-casino-cards-content"
          field="table_full"
          view={text => (
            <Text size="xs" tag="span">
              {text}
            </Text>
          )}
        />
      )}
    </Text>
  </React.Fragment>
);

const Type = props => (
  <Matcher
    getKey={({ condition }) => condition}
    matchers={{
      results: renderResults,
      seats: renderSeats,
      default: () => null,
    }}
    {...props}
  />
);

const CardData = ({ className, game, ...props }: Props) => {
  const condition = game.results
    ? "results"
    : game.type === "Blackjack"
      ? "seats"
      : null;
  return (
    condition && (
      <div className="c-card-data o-flex--vertical o-flex-align--center o-flex-justify--end u-width--1/1 u-font-weight-bold">
        <Type condition={condition} game={game} />
      </div>
    )
  );
};

export default CardData;
