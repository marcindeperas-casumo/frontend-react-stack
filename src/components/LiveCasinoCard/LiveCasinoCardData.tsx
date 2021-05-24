import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import React from "react";
import classNames from "classnames";
import { cond, contains, equals, flip, T } from "ramda";
import * as A from "Types/apollo";
import {
  EVOLUTION_LOBBY_TYPES as TYPES,
  RESULT_BADGES_COUNT,
} from "./constants";
import { getBadgeColor, getBadgeBorderColor, getResultsDisplay } from "./utils";
import "./LiveCasinoCardData.scss";

type Props = {
  liveCasinoLobby: A.GameListLiveCasinoQuery["gamesList"]["games"][number]["liveCasinoLobby"];
  t?: {
    bet_behind: string;
    open_seats: string;
  };
};

const getTextColor = (color: string) =>
  contains(color, ["yellow-30", "grey-5"]) ? "grey-90" : "white";

const renderResults = ({ results, type }) => {
  if (!results || !type) {
    return null;
  }

  return (
    <Flex
      spacing="sm"
      align="center"
      className="o-position--absolute u-width--full u-height--full u-padding-left--md u-padding-bottom u-padding-top u-padding-vertical"
    >
      {results.slice(0, RESULT_BADGES_COUNT).map((result, i) => {
        const color = getBadgeColor(type, result);
        const borderColor = getBadgeBorderColor(type, result);
        return (
          <Flex.Item key={i}>
            <Flex
              align="center"
              justify="center"
              className={classNames(
                "t-border-r--circle",
                `t-background-${color}`,
                borderColor && `t-border--md t-border-${borderColor}`,
                "u-width--lg u-height--lg",
                {
                  "c-card-data__badge": i === 0,
                }
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
      className="text-white u-font-weight-bold u-text-transform-capitalize u-line-height--1"
    >
      {liveCasinoLobby.seats || t?.bet_behind}{" "}
      {liveCasinoLobby.seats ? t?.open_seats : ""}
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
        justify="center"
        className="u-width--full o-position--relative u-height--full"
      >
        <LobbyType liveCasinoLobby={liveCasinoLobby} t={t} />
        <div className="c-card-data__badges-mask u-width--full u-height--full o-position--absolute" />
      </Flex>
    </Flex>
  );
};
