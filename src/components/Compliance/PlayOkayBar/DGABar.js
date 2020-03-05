import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ClockIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import StopSpilletIcon from "./icons/stopspillet.svg";
import DanishLicenseIcon from "./icons/danishlicense.svg";
import "./PlayOkayBar.scss";

export const DGABar = () => (
  <Flex
    justify="end"
    align="center"
    spacing="md"
    className="c-playokay-bar t-background-chrome-dark-3 t-color-white u-padding-x"
  >
    <Flex.Item>
      <Text tag="span" size="2xs">
        <a
          className="t-color-grey-light-1 u-display--flex"
          href="https://www.rofus.nu/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Spil med omtanke | ROFUS.nu
        </a>
      </Text>
    </Flex.Item>
    <Flex.Item>
      <a
        href="https://www.stopspillet.dk/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <StopSpilletIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
    <Flex.Item>
      <a
        href="https://www.spillemyndigheden.dk/tilladelsesindehaver/casumo-service-ltd"
        rel="noopener noreferrer"
        target="_blank"
      >
        <DanishLicenseIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
    <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-light-1 u-display--flex">
      <ClockIcon size="sm" className="u-margin-right" />
      <CurrentSessionTimer />
    </Flex.Item>
  </Flex>
);
