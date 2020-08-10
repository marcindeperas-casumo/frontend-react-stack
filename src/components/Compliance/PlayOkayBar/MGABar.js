// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import { ClockIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import { FullscreenToggle } from "Components/FullscreenView";
import "./PlayOkayBar.scss";

export const MGABar = () => (
  <Flex
    justify="end"
    align="center"
    className="c-playokay-bar t-background-grey-90 t-color-white u-padding-x"
  >
    <Flex.Block>
      <FullscreenToggle elementOverride={document.body} />
    </Flex.Block>
    <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-5 u-display--flex">
      <ClockIcon size="sm" className="u-margin-right" />
      <CurrentSessionTimer />
    </Flex.Item>
  </Flex>
);
