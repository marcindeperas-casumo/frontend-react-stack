// @flow
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  useEffect(() => {
    if (content && !window.localStorage.preGamePanicButtonOverlayShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.GGL_PRE_PANIC_BUTTON, {
          content,
        })
      );
    }
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  const selfExclude24h = ({ elapsedTime }) => {
    // Not really required but not harmful either. Extra sanity check if someone
    // was to change the default transition-duration to non-zero value 🙂
    if (elapsedTime !== INTERACTION_TIME_SECONDS) {
      return;
    }

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

  return (
    <ButtonSecondary
      className="t-background-grey-70 t-background-grey-70:hover
        t-color-white u-text-transform-uppercase
        o-position--relative u-overflow--hidden
        c-playokay-bar__panic-button"
      size="xs"
      style={{ "--panic-btn-duration": `${INTERACTION_TIME_SECONDS}s` }}
      onTransitionEnd={selfExclude24h}
      onTouchStart="" // Good job Apple iOS Safari team 😒
    >
      {content?.button_label}
    </ButtonSecondary>
  );
};
