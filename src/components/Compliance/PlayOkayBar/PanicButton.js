// @flow
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLongPress } from "react-use";
import classNames from "classnames";
import { ButtonSecondary } from "@casumo/cmp-button";
import { showModal } from "Models/modal";
import http from "Lib/http";
import { playerIdSelector } from "Models/handshake";
import { useTranslations } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";

const INTERACTION_TIME_SECONDS = 3;

export const PanicButton = () => {
  const content = useTranslations("ggl-panic-button");
  const playerId = useSelector(playerIdSelector);
  const dispatch = useDispatch();
  const [isInteractive, setInteractive] = useState(false);

  useEffect(() => {
    if (content && !window.localStorage.preGamePanicButtonOverlayShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.GGL_PRE_PANIC_BUTTON, {
          content,
        })
      );
    }
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  const selfExclude24h = e => {
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

  const {
    onMouseDown,
    onTouchStart,
    onMouseUp,
    onMouseLeave,
    onTouchEnd,
  } = useLongPress(selfExclude24h, { delay: INTERACTION_TIME_SECONDS * 1000 });
  const longPressProps = {
    onMouseDown: e => {
      setInteractive(true);
      onMouseDown(e);
    },
    onTouchStart: e => {
      setInteractive(true);
      onTouchStart(e);
    },
    onMouseUp: () => {
      setInteractive(false);
      onMouseUp();
    },
    onMouseLeave: () => {
      setInteractive(false);
      onMouseLeave();
    },
    onTouchEnd: () => {
      setInteractive(false);
      onTouchEnd();
    },
  };

  return (
    <ButtonSecondary
      className={classNames(
        "t-background-grey-70",
        "t-color-white",
        "u-text-transform-uppercase",
        "o-position--relative",
        "u-overflow--hidden",
        "c-playokay-bar__panic-button",
        { "c-playokay-bar__panic-button--interactive": isInteractive }
      )}
      size="xs"
      style={{ "--panic-btn-duration": `${INTERACTION_TIME_SECONDS}s` }}
      {...longPressProps}
    >
      {content?.button_label}
    </ButtonSecondary>
  );
};
