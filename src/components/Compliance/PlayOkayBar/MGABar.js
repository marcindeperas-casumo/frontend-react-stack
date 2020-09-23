// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import { ProfileIconWithDrawerContainer as ProfileIconWithDrawer } from "./ProfileIconWithDrawerContainer";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import "./PlayOkayBar.scss";

export const MGABar = ({ pauseGame, resumeGame }: PauseResumeProps) => (
  <Flex
    justify="end"
    align="center"
    className="c-playokay-bar t-background-grey-90 t-color-white u-padding-x"
  >
    <Flex.Block>
      <ProfileIconWithDrawer pauseGame={pauseGame} resumeGame={resumeGame} />
    </Flex.Block>
    <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-5 u-display--flex">
      <TimeLockedIcon size="sm" className="u-margin-right" />
      <CurrentSessionTimer />
    </Flex.Item>
  </Flex>
);
