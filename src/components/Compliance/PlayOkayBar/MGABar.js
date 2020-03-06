// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import { ClockIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import "./PlayOkayBar.scss";

export const MGABar = () => (
  <Flex
    justify="end"
    align="center"
    className="c-playokay-bar t-background-chrome-dark-3 t-color-white u-padding-x"
  >
    <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-light-1 u-display--flex">
      <ClockIcon size="sm" className="u-margin-right" />
      <CurrentSessionTimer />
    </Flex.Item>
  </Flex>
);
