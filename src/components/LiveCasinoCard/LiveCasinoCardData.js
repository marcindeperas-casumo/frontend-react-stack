// @flow
import React from "react";
import classNames from "classnames";
import { cond, contains, equals, flip, T } from "ramda";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import {
  EVOLUTION_LOBBY_TYPES as TYPES,
  RESULT_BADGES_COUNT,
} from "./constants";
import { getBadgeColor, getBadgeBorderColor, getResultsDisplay } from "./utils";
import "./LiveCasinoCardData.scss";

type Props = {|
  liveCasinoLobby: A.GameListLiveCasinoQuery_gamesList_games_liveCasinoLobby,
  t: A.LiveCasinoCardCmsQuery,
|};

const getTextColor = (color: string) =>
  contains(color, ["yellow", "grey-light-1"]) ? "grey-dark-3" : "white";

const renderResults = ({ results, type }) => {
  if (!results || !type) {
    return null;
  }

  return (
    <Flex spacing="sm" className="u-margin-bottom u-padding-top u-margin-left">
      {results.slice(0, RESULT_BADGES_COUNT).map((result, i) => {
        const color = getBadgeColor(type, result);
        const borderColor = getBadgeBorderColor(type, result);
        return (
          <Flex.Item key={i}>
            <Flex
              align="center"
              justify="center"
              className={classNames(
                "u-width--lg u-height--lg t-border-r--circle u-margin-left--sm",
                `t-background-${color}`,
                borderColor &&
                  `t-border-width--md t-border--current-color t-color-${borderColor}`,
                { "c-card-data__badge": i === 0 }
              )}
            >
              <Text
                className={classNames(`t-color-${getTextColor(color)}`)}
                size="xs"
                tag="span"
              >
                {getResultsDisplay(type, result)}
              </Text>
            </Flex>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

const renderSeats = ({ liveCasinoLobby, t }) => {
  return (
    <Text
      size="sm"
      tag="span"
      className="t-color-white u-font-weight-bold u-text-transform-capitalize"
    >
      {liveCasinoLobby.seats || t.betBehindText}{" "}
      {liveCasinoLobby.seats ? t.openSeatsText : ""}
    </Text>
  );
};

const isIn = flip(contains);

const liveCasinoTypes = [
  TYPES.MONEYWHEEL,
  TYPES.ROULETTE,
  TYPES.TOPCARD,
  TYPES.MONOPOLY,
  TYPES.BACCARAT,
];

const LobbyType = ({ liveCasinoLobby, t }) =>
  cond([
    [isIn(liveCasinoTypes), () => renderResults(liveCasinoLobby)],
    [equals(TYPES.BLACKJACK), () => renderSeats({ liveCasinoLobby, t })],
    [T, () => null],
  ])(liveCasinoLobby.type);

export const LiveCasinoCardData = ({ liveCasinoLobby, t }: Props) => {
  return (
    <Flex
      align="center"
      justify="center"
      className={classNames(
        (contains(liveCasinoLobby.type, liveCasinoTypes) ||
          liveCasinoLobby.betBehind) &&
          "c-card-data__badges-background u-width--full"
      )}
    >
      <Flex
        direction="vertical"
        align="center"
        className="u-width--full u-position-relative"
      >
        <LobbyType liveCasinoLobby={liveCasinoLobby} t={t} />
        <div className="c-card-data__badges-mask u-width--full u-height--full u-position-absolute" />
      </Flex>
    </Flex>
  );
};
