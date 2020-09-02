// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { SearchIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { REACT_APP_SPORTS_SHOW_SEARCH } from "Src/constants";
import bridge from "Src/DurandalReactBridge";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import StadiumIcon from "./icons/stadium.svg";
import BetslipIcon from "./icons/betslip.svg";
import "./SportsTopBar.scss";

export const hashes = {
  betHistory: "#bethistory",
  home: "#home",
};

/* eslint-disable fp/no-mutation */
const navigateTo = {
  home: () => {
    window.location.hash = hashes.home;
    bridge.emit(REACT_APP_SPORTS_SHOW_SEARCH, false);
  },
  search: () => {
    window.location.hash = hashes.home;
    bridge.emit(REACT_APP_SPORTS_SHOW_SEARCH, true);
  },
  myBets: () => {
    window.location.hash = hashes.betHistory;
    bridge.emit(REACT_APP_SPORTS_SHOW_SEARCH, false);
  },
};
/* eslint-enable fp/no-mutation */

type SportsTopBarTabProps = {
  children: Node,
  termKey: string,
  onClick: any => any,
  isActive?: boolean,
  style?: any,
  className?: string,
};

export const SportsTopBarTab = ({
  isActive,
  termKey,
  children,
  onClick,
  style,
  className = "",
}: SportsTopBarTabProps) => (
  <Flex
    align="center"
    className={classNames(
      "c-sports-top-bar-tab u-cursor-pointer",
      !isActive && "t-color-grey-50",
      className
    )}
    direction="vertical"
    justify="space-between"
    onClick={onClick}
    style={style}
  >
    <Flex.Item>{children}</Flex.Item>
    <Flex.Block>
      <Text
        size="sm"
        className={classNames(
          "u-font-weight-bold u-margin--none",
          isActive ? "t-border-bottom--md t-border-current" : "t-border--none"
        )}
      >
        <DictionaryTerm termKey={termKey} />
      </Text>
    </Flex.Block>
  </Flex>
);

type Props = {
  currentHash: string,
  isSearchVisible?: boolean,
};

const SportsTopBar = ({ currentHash, isSearchVisible }: Props) => {
  const isMyBetsVisible =
    currentHash.startsWith(hashes.betHistory) && !isSearchVisible;

  const isHomeVisible = !isMyBetsVisible && !isSearchVisible;

  return (
    <Flex
      align="center"
      className="c-sports-top-bar u-padding-x--lg t-color-grey-90"
    >
      <Flex.Block>
        <Text
          tag="h1"
          size="lg"
          className="u-padding-y--3xlg"
          data-test="sports-top-bar-title"
        >
          <DictionaryTerm termKey="desktop.tab.home" />
        </Text>
      </Flex.Block>
      <Flex.Block>
        <Flex justify="end" spacing="xlg">
          <Flex.Item>
            <SportsTopBarTab
              termKey="desktop.tab.lobby"
              onClick={navigateTo.home}
              isActive={isHomeVisible}
            >
              <StadiumIcon />
            </SportsTopBarTab>
          </Flex.Item>
          <Flex.Item>
            <SportsTopBarTab
              termKey="desktop.tab.search"
              onClick={navigateTo.search}
              isActive={isSearchVisible}
              className="c-sports-top-bar--search"
            >
              <SearchIcon size="md" />
            </SportsTopBarTab>
          </Flex.Item>
          <Flex.Item>
            <SportsTopBarTab
              termKey="desktop.tab.bet-history"
              onClick={navigateTo.myBets}
              isActive={isMyBetsVisible}
              className="c-sports-top-bar--bet-history"
            >
              <BetslipIcon />
            </SportsTopBarTab>
          </Flex.Item>
        </Flex>
      </Flex.Block>
    </Flex>
  );
};

export default SportsTopBar;
