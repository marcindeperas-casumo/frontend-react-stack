import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SwipeUpPanel } from "./SwipeUpPanel";

type Props = {
  shouldShowSwipePanel: boolean;
  onDismiss: () => void;
  fullScreenElement: HTMLElement | undefined;
};

export type TSwipeUpTranslations = {
  swipeUpText: string | undefined;
  tapToFullscreenText: string | undefined;
  dismissText: string | undefined;
};

export const SwipeUpPanelContainer = ({
  fullScreenElement,
  onDismiss,
  shouldShowSwipePanel,
}: Props) => {
  const { t, loading } = useTranslationsGql({
    swipeUpText: "root:mobile.game-launch:fields.swipe_up_text",
    tapToFullscreenText:
      "root:mobile.game-launch:fields.tap_to_fullscreen_text",
    dismissText: "root:mobile.game-launch:fields.dismiss_text",
  });

  return shouldShowSwipePanel ? (
    <SwipeUpPanel {...{ t, loading, fullScreenElement, onDismiss }} />
  ) : null;
};
