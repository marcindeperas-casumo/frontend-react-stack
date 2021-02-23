//@flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SwipeUpPanel } from "./SwipeUpPanel";

type Props = {
  shouldShowSwipePanel: boolean,
  onDismiss: () => void,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  fullScreenElement: ?HTMLElement,
};

export type TSwipeUpTranslations = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  swipeUpText: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  tapToFullscreenText: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  dismissText: ?string,
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: {}; loading: boolean; fullScreenElement... Remove this comment to see the full error message
    <SwipeUpPanel {...{ t, loading, fullScreenElement, onDismiss }} />
  ) : null;
};
