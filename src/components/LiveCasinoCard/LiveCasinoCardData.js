import React from "react";
import classNames from "classnames";
import { cond, contains, equals, flip, T } from "ramda";

import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import CMSField from "Components/CMSField";
import Matcher from "Components/Matcher";

import { getBadgeColor, topCardLetters } from "./utils";

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

const renderResults = ({ results, type }) => {
  const list = results.slice(0, 5).map(v => (v === "S" ? "T" : v));
  return (
    <React.Fragment>
      <div className="o-layout o-layout--gap u-margin-bottom">
        {list.map((n, i) => {
          const color = getBadgeColor(type, n);
          return (
            <Badge
              key={i}
              tag="div"
              bgColor={color}
              txtColor={color === "yellow" ? "grey-dark-3" : "white"}
              circle={true}
            >
              {type === "TopCard"
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
        className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
      >
        {type === "TopCard"
          ? getText("recent_letters")
          : getText("recent_numbers")}
      </Text>
    </React.Fragment>
  );
};

const renderSeats = ({ seats }) => (
  <React.Fragment>
    <Badge
      className={classNames(!seats && "u-width--2/3", "u-margin-bottom")}
      tag="div"
      bgColor="green"
      txtColor="white"
      circle={Boolean(seats)}
    >
      {seats || (
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
      className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
    >
      {seats ? getText("open_seats") : getText("table_full")}
    </Text>
  </React.Fragment>
);

const DataType = props => (
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

const RENDER_TYPE = {
  SEATS: "seats",
  RESULTS: "results",
};

const isIn = flip(contains);

const CardData = ({ lobby }) => {
  const renderType = cond([
    [equals("Blackjack"), () => RENDER_TYPE.SEATS],
    [isIn(["MoneyWheel", "Roulette", "TopCard"]), () => RENDER_TYPE.RESULTS],
    [T, () => null],
  ])(lobby.type);

  return (
    renderType && (
      <div className="c-card-data o-flex--vertical o-flex-align--center o-flex-justify--end u-width--1/1 u-font-weight-bold">
        <DataType condition={renderType} {...lobby} />
      </div>
    )
  );
};

export default CardData;
