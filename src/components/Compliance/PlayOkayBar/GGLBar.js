// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import { PanicButton } from "./PanicButton";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import "./PlayOkayBar.scss";

type Props = PauseResumeProps & {
  className?: string,
};

export const GGLBar = ({ pauseGame, resumeGame, className = "" }: Props) => {
  return (
    <Flex justify="end" align="center" className={className}>
      <Flex.Block className="u-text-align-center">
        <PanicButton />
      </Flex.Block>
      <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-5 u-display--flex">
        <TimeLockedIcon size="sm" className="u-margin-right" />
        <CurrentSessionTimer />
      </Flex.Item>
    </Flex>
  );
};
