// @flow

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Flex from "@casumo/cmp-flex";
import { ButtonSecondary } from "@casumo/cmp-button";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { showModal } from "Models/modal";
import http from "Lib/http";
import { playerIdSelector } from "Models/handshake";
import { useTranslations } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import "./PlayOkayBar.scss";

type Props = PauseResumeProps & {
  className?: string,
};

export const GGLBar = ({ pauseGame, resumeGame, className = "" }: Props) => {
  const content = useTranslations("ggl-panic-button");
  const playerId = useSelector(playerIdSelector);
  const dispatch = useDispatch();

  const onClick = () => {
    http
      .post("/api/common/command/player/selfExclude", {
        playerId: playerId,
        duration: 1,
        marketingClosure: true,
        reason: "panic-button",
      })
      .then(() => {
        dispatch(
          showModal(REACT_APP_MODAL.ID.GGL_POST_PANIC_BUTTON, {
            content,
          })
        );
      });
  };

  useEffect(() => {
    if (content && !window.localStorage.preGamePanicButtonOverlayShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.GGL_PRE_PANIC_BUTTON, {
          content,
        })
      );
    }
  }, [content, dispatch]);

  return (
    <Flex justify="end" align="center" className={className}>
      <Flex.Block>
        <ButtonSecondary
          className="t-background-grey-70 t-color-white u-text-transform-uppercase c-playokay-bar__button"
          onClick={onClick}
          size="xs"
        >
          {content?.button_label}
        </ButtonSecondary>
      </Flex.Block>
      <Flex.Item className="c-playokay-bar__clock u-font-xs t-color-grey-5 u-display--flex">
        <TimeLockedIcon size="sm" className="u-margin-right" />
        <CurrentSessionTimer />
      </Flex.Item>
    </Flex>
  );
};
