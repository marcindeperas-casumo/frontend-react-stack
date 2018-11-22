import React from "react";
import classNames from "classnames";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import CMSField from "Components/CMSField";

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
      circle={!!seats}
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

const CardData = ({ lobby }) => {
  const type =
    lobby.type === "Blackjack"
      ? "seats"
      : ["MoneyWheel", "Roulette", "TopCard"].includes(lobby.type)
        ? "results"
        : null;

  const renderType = {
    results: renderResults,
    seats: renderSeats,
    default: () => null,
  };

  return (
    renderType && (
      <div className="c-card-data o-flex--vertical o-flex-align--center o-flex-justify--end u-width--1/1 u-font-weight-bold">
        {(renderType[type] || renderType.default)(lobby)}
      </div>
    )
  );
};

export default CardData;
