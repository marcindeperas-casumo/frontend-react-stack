// @flow
import React from "react";
import classNames from "classnames";
import { cond, contains, equals, flip, T } from "ramda";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { CMSField } from "Components/CMSField";
import type { liveCasinoLobby } from "Types/liveCasinoLobby";
import { EVOLUTION_LOBBY_TYPES as TYPES } from "Src/constants";
import { getBadgeColor, getBadgeBorderColor, getResultsDisplay } from "./utils";
import "./LiveCasinoCardData.scss";

const RESULT_BADGES = 5;

type Props = {|
  lobby: liveCasinoLobby,
|};

const getTextColor = (color: string) =>
  contains(color, ["yellow", "grey-light-1"]) ? "grey-dark-3" : "white";

const renderResults = ({ results, type }) => (
  <>
    <div className="o-layout o-layout--gap">
      {results.slice(0, RESULT_BADGES).map((n, i) => {
        const color = getBadgeColor(type, n);
        const borderColor = getBadgeBorderColor(type, n);
        return (
          <Badge
            key={i}
            tag="div"
            bgColor={color}
            txtColor={getTextColor(color)}
            circle={true}
            className={classNames(
              borderColor && `c-card-data-badge-shadow-${borderColor}`
            )}
          >
            {getResultsDisplay(type, n)}
          </Badge>
        );
      })}
    </div>
    <Text
      size="xs"
      className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
    >
      {type === TYPES.TOPCARD
        ? getText("recent_letters")
        : getText("recent_numbers")}
    </Text>
  </>
);

const renderSeats = ({ seats }) => (
  <>
    <Badge
      className={classNames(!seats && `u-width--3/4`)}
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
            <Text size="xs" tag="span" className="u-text-nowrap">
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
  </>
);

const renderHistory = ({ history, type }) => {
  if (!history) {
    return null;
  }

  return (
    <>
      <div className="o-layout o-layout--gap">
        {history.slice(0, RESULT_BADGES).map((n, i) => (
          <Badge
            key={i}
            tag="div"
            bgColor={getBadgeColor(type, n)}
            txtColor={"white"}
            circle={true}
          >
            {n}
          </Badge>
        ))}
      </div>
      <Text
        size="xs"
        className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
      >
        {getText("recent_outcomes")}
      </Text>
    </>
  );
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

const isIn = flip(contains);
const LobbyType = ({ lobby }) =>
  cond([
    [equals(TYPES.BLACKJACK), () => renderSeats(lobby)],
    [equals(TYPES.BACCARAT), () => renderHistory(lobby)],
    [
      isIn([TYPES.MONEYWHEEL, TYPES.ROULETTE, TYPES.TOPCARD, TYPES.MONOPOLY]),
      () => renderResults(lobby),
    ],
    [T, () => null],
  ])(lobby.type);

const LiveCasinoCardData = ({ lobby }: Props) => (
  <Flex direction="vertical" align="center" className="u-width--1/1">
    <LobbyType lobby={lobby} />
  </Flex>
);

export default LiveCasinoCardData;
