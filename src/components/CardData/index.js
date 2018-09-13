/* @flow */
import React from "react";
import classNames from "classnames";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import CMSField from "../CMSField";
import Matcher from "../Matcher";

import { getBadgeColor, topCardLetters } from "./utils";

import "./CardData.scss";

type Props = {
  className?: string,
  /** lobby game data */
  game: {},
  /** maximum result numbers to show */
  max: number,
};

const getText = field => (
  <CMSField
    slug="mobile.live-casino-cards-content"
    field={field}
    view={text => (
      <Text size="xs" tag="span">
        {text}
      </Text>
    )}
  />
);

const renderResults = ({ game }) => (
  <React.Fragment>
    <div className="o-layout o-layout--gap u-margin-bottom">
      {game.results.slice(0, 5).map((n, i) => {
        const color = getBadgeColor(game.type, n);
        return (
          <Badge
            key={i}
            tag="div"
            bgColor={color}
            txtColor={color === "yellow" ? "grey-dark-3" : "white"}
            circle={true}
          >
            {game.type === "TopCard"
              ? topCardLetters[n]
              : isNaN(parseInt(n, 10))
                ? n
                : parseInt(n, 10)}
          </Badge>
        );
      })}
    </div>
    <Text
      size="xs"
      className="t-color-white u-margin-bottom--small u-font-weight-bold u-text-transform-uppercase"
    >
      {game.type === "TopCard"
        ? getText("recent_letters")
        : getText("recent_numbers")}
    </Text>
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
          view={text => (
            <Text size="xs" tag="span">
              {text}
            </Text>
          )}
        />
      )}
    </Badge>
    <Text
      size="xs"
      className="t-color-white u-margin-bottom--small u-font-weight-bold u-text-transform-uppercase"
    >
      {game.seats ? getText("open_seats") : getText("table_full")}
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
  let renderType = null;
  if (game.type === "Blackjack") renderType = "seats";
  if (["MoneyWheel", "Roulette", "TopCard"].includes(game.type))
    renderType = "results";

  return (
    renderType && (
      <div className="c-card-data o-flex--vertical o-flex-align--center o-flex-justify--end u-width--1/1 u-font-weight-bold">
        <Type condition={renderType} game={game} />
      </div>
    )
  );
};

export default CardData;
