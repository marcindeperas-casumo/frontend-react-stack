//@flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";

export const SwipeUpMessageText = () => {
  const { t, loading } = useTranslationsGql({
    swipeUpText: "root:mobile.game-launch:fields.swipe_up_text",
  });

  if (loading) {
    return null;
  }

  return <span>{t.swipeUpText}</span>;
};

export const TapToFullscreenText = () => {
  const { t, loading } = useTranslationsGql({
    tapToFullscreenText:
      "root:mobile.game-launch:fields.tap_to_fullscreen_text",
  });

  if (loading) {
    return null;
  }

  return <span>{t.tapToFullscreenText}</span>;
};
