import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import React from "react";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import StopSpilletIcon from "./icons/stopspillet.svg";
import DanishLicenseIcon from "./icons/danishlicense.svg";
import "./PlayOkayBar.scss";

const links = {
  rofus: "https://www.rofus.nu/",
  spillemyndigheden:
    "https://www.spillemyndigheden.dk/tilladelsesindehaver/casumo-service-ltd",
  stopspillet: "https://www.stopspillet.dk/",
};

type Props = {
  className?: string;
};

export const DGABar = ({ className = "" }: Props) => (
  <Flex justify="end" align="center" spacing="md" className={className}>
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
