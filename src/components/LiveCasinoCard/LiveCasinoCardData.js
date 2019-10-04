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

const RESULT_BADGES = 9;

type Props = {|
  lobby: liveCasinoLobby,
|};

const getTextColor = (color: string) =>
  contains(color, ["yellow", "grey-light-1"]) ? "grey-dark-3" : "white";

const renderResults = ({ results, type }) => {
  if (!results) {
    return null;
  }

  return (
    <>
      <Flex
        spacing="sm"
        className="u-margin-bottom u-padding-top u-margin-left--md u-padding-right--sm"
      >
        {results.slice(0, RESULT_BADGES).map((n, i) => {
          const color = getBadgeColor(type, n);
          const borderColor = getBadgeBorderColor(type, n);
          return (
            <Flex.Item key={i}>
              <Badge
                size="xs"
                tag="div"
                bgColor={color}
                txtColor={getTextColor(color)}
                circle={true}
                className={classNames(
                  borderColor && `c-card-data-badge-shadow-${borderColor}`,
                  i === 0 && "c-card-data-badge"
                )}
              >
                {getResultsDisplay(type, n)}
              </Badge>
            </Flex.Item>
          );
        })}
      </Flex>
    </>
  );
};

const renderSeats = ({ seats }) => (
  <>
    <Badge
      size="sm"
      className={classNames(!seats && "u-width--3/4", "u-margin-bottom")}
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
            <Text size="sm" tag="span" className="u-text-nowrap">
              {text}
            </Text>
          )}
        />
      )}
    </Badge>
    <Text
      size="2xs"
      className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
    >
      {seats ? getText("open_seats") : getText("table_full")}
    </Text>
  </>
);

const getText = field => (
  <CMSField slug="mobile.live-casino-cards-content" field={field} />
);

const DisplayText = ({ type }) =>
  cond([
    [equals(TYPES.TOPCARD), () => getText("recent_letters")],
    [equals(TYPES.BACCARAT), () => getText("recent_outcomes")],
    [T, () => getText("recent_numbers")],
  ])(type);

const isIn = flip(contains);
const LobbyType = ({ lobby }) =>
  cond([
    [
      isIn([
        TYPES.MONEYWHEEL,
        TYPES.ROULETTE,
        TYPES.TOPCARD,
        TYPES.MONOPOLY,
        TYPES.BACCARAT,
      ]),
      () => renderResults(lobby),
    ],
    [equals(TYPES.BLACKJACK), () => renderSeats(lobby)],
    [T, () => null],
  ])(lobby.type);

const LiveCasinoCardData = ({ lobby }: Props) => (
  <>
    <Flex className="c-card-data-badges-background u-opacity-75 t-background-black u-position-absolute"></Flex>
    <Flex
      direction="vertical"
      align="center"
      className="u-width--1/1 u-position-relative"
    >
      <LobbyType lobby={lobby} />
      <div className="c-card-data-badges-mask u-position-absolute" />
    </Flex>
  </>
);

export default LiveCasinoCardData;
