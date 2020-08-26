// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import { ProfileDrawerContainer as ProfileIconWithDrawer } from "./ProfileDrawerContainer";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import SpelPausIcon from "./icons/spelpaus.svg";
import SpelGranserIcon from "./icons/spelgranser.svg";
import SjalvTestIcon from "./icons/sjalvtest.svg";
import "./PlayOkayBar.scss";

const links = {
  playokaysettings: "/sv/player/play-okay-settings",
  spelpaus: "https://www.spelpaus.se/?cos=true",
  stodlinjen: "https://www.stodlinjen.se/#!/spelberoende-test-pgsi",
};

export const SGABar = ({ pauseGame, resumeGame }: PauseResumeProps) => (
  <Flex
    justify="end"
    align="center"
    className="c-playokay-bar t-background-grey-90 t-color-white u-padding-x"
  >
    <Flex.Block>
      <ProfileIconWithDrawer pauseGame={pauseGame} resumeGame={resumeGame} />
    </Flex.Block>
    <Flex.Item>
      <a href={links.spelpaus} rel="noopener noreferrer" target="_blank">
        <SpelPausIcon className="c-playokay-bar__icon c-playokay-bar__icon--spelpaus" />
      </a>
    </Flex.Item>

    <Flex.Item>
      <a
        href={links.playokaysettings}
        rel="noopener noreferrer"
        target="_blank"
      >
        <SpelGranserIcon className="c-playokay-bar__icon c-playokay-bar__icon--spelgranser" />
      </a>
    </Flex.Item>
    <Flex.Item>
      <a href={links.stodlinjen} rel="noopener noreferrer" target="_blank">
        <SjalvTestIcon className="c-playokay-bar__icon c-playokay-bar__icon--sjalvtest" />
      </a>
    </Flex.Item>
    <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-5 u-display--flex">
      <TimeLockedIcon size="sm" className="u-margin-right" />
      <CurrentSessionTimer />
    </Flex.Item>
  </Flex>
);
