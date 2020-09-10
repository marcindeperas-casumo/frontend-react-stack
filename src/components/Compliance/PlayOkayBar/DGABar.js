// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import { ProfileIconWithDrawerContainer as ProfileIconWithDrawer } from "./ProfileIconWithDrawerContainer";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import StopSpilletIcon from "./icons/stopspillet.svg";
import DanishLicenseIcon from "./icons/danishlicense.svg";
import "./PlayOkayBar.scss";

const links = {
  rofus: "https://www.rofus.nu/",
  spillemyndigheden:
    "https://www.spillemyndigheden.dk/tilladelsesindehaver/casumo-service-ltd",
  stopspillet: "https://www.stopspillet.dk/",
};

export const DGABar = ({ pauseGame, resumeGame }: PauseResumeProps) => (
  <Flex
    justify="end"
    align="center"
    spacing="md"
    className="c-playokay-bar t-background-grey-90 t-color-white u-padding-x"
  >
    <Flex.Block>
      <ProfileIconWithDrawer pauseGame={pauseGame} resumeGame={resumeGame} />
    </Flex.Block>
    <Flex.Item>
      <Text tag="span" size="2xs">
        <a
          className="t-color-grey-5 u-display--flex"
          href={links.rofus}
          rel="noopener noreferrer"
          target="_blank"
        >
          Spil med omtanke | ROFUS.nu
        </a>
      </Text>
    </Flex.Item>
    <Flex.Item>
      <a href={links.stopspillet} rel="noopener noreferrer" target="_blank">
        <StopSpilletIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
    <Flex.Item>
      <a
        href={links.spillemyndigheden}
        rel="noopener noreferrer"
        target="_blank"
      >
        <DanishLicenseIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
    <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-5 u-display--flex">
      <TimeLockedIcon size="sm" className="u-margin-right" />
      <CurrentSessionTimer />
    </Flex.Item>
  </Flex>
);
