// @flow
import React from "react";
import classNames from "classnames";
import { cond, contains, equals, flip, T } from "ramda";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { CMSField } from "Components/CMSField";
import type { liveCasinoLobby } from "Types/liveCasinoLobby";
import { EVOLUTION_LOBBY_TYPES as TYPES } from "Src/constants";
import { getBadgeColor, getBadgeBorderColor, getResultsDisplay } from "./utils";
import "./LiveCasinoCardData.scss";

const RESULT_BADGES = 10;

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
        className="u-margin-bottom u-padding-top u-margin-left"
      >
        {results.slice(0, RESULT_BADGES).map((n, i) => {
          const color = getBadgeColor(type, n);
          const borderColor = getBadgeBorderColor(type, n);
          return (
            <Flex.Item key={i}>
              <Flex
                align="center"
                justify="center"
                className={classNames(
                  "u-width--lg u-height--lg t-border-r--circle u-margin-left--sm",
                  `t-background-${color}`,
                  `t-color-${getTextColor(color)}`,
                  borderColor && `c-card-data-badge-shadow-${borderColor}`,
                  i === 0 && "c-card-data-badge"
                )}
              >
                <Text size="xs" tag="span">
                  {getResultsDisplay(type, n)}
                </Text>
              </Flex>
            </Flex.Item>
          );
        })}
      </Flex>
    </>
  );
};

const renderSeats = ({ seats }) => (
  <Text
    size="sm"
    className="t-color-white u-margin-bottom u-margin-top u-padding-bottom--sm u-font-weight-bold u-text-transform-capitalize"
  >
    {seats || getText("bet_behind")} {seats ? getText("open_seats") : ""}
  </Text>
);

const getText = field => (
  <CMSField slug="mobile.live-casino-cards-content" field={field} />
);

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
      className="u-width--full u-position-relative"
    >
      <LobbyType lobby={lobby} />
      <div className="c-card-data-badges-mask u-position-absolute" />
    </Flex>
  </>
);

export default LiveCasinoCardData;
