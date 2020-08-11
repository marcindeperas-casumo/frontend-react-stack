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
  t: Object,
  className?: string,
  small?: boolean,
|};

const getTextColor = (color: string) =>
  contains(color, ["yellow-30", "grey-5"]) ? "grey-90" : "white";

const renderResults = ({ results, type }, small = false) => {
  if (!results || !type) {
    return null;
  }

  return (
    <Flex
      spacing={small ? "sm" : "default"}
      align="center"
      className={classNames(
        "u-position-absolute u-width--full u-height--full u-padding-left--md",
        {
          "u-padding-bottom u-padding-top u-padding-vertical": !small,
          "u-padding-bottom--sm u-padding-top--sm": small,
        }
      )}
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
                {
                  "u-width--lg u-height--lg": !small,
                  "u-width--md u-height--md": small,
                  "c-card-data__badge": i === 0,
                  "c-card-data__badge--small": small,
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

const renderSeats = ({ liveCasinoLobby, t }, small = false) => {
  return (
    <Text
      size="sm"
      tag="span"
      className="t-color-white u-font-weight-bold u-text-transform-capitalize u-line-height--1"
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

const LobbyType = ({ liveCasinoLobby, t, small }) =>
  cond([
    [isIn(liveCasinoTypes), () => renderResults(liveCasinoLobby, small)],
    [equals(TYPES.BLACKJACK), () => renderSeats({ liveCasinoLobby, t }, small)],
    [T, () => null],
  ])(liveCasinoLobby.type);

export const LiveCasinoCardData = ({
  liveCasinoLobby,
  t,
  className,
  small = false,
}: Props) => {
  return (
    <Flex
      align="center"
      justify="center"
      className={classNames(
        (contains(liveCasinoLobby.type, liveCasinoTypes) ||
          liveCasinoLobby.betBehind) &&
          "c-card-data__badges-background u-width--full",
        {
          "c-card-data__badges-background--small": small,
        },
        className
      )}
    >
      <Flex
        direction="vertical"
        align="center"
        justify="center"
        className="u-width--full u-position-relative u-height--full"
      >
        <LobbyType liveCasinoLobby={liveCasinoLobby} t={t} small={small} />
        <div className="c-card-data__badges-mask u-width--full u-height--full u-position-absolute" />
      </Flex>
    </Flex>
  );
};
