// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import { ProgressCircle } from "Components/Progress";
import { useTranslationsGql } from "Utils/hooks";

import "./ReelRaceStartingNotification.scss";

const cmsPrefix = "root:iframe-solution:fields";

type Props = {
  secondsLeft: number,
  secondsLeftWhenShown: number,
  onClickDismiss: () => void,
};

export function ReelRaceStartingNotification({
  secondsLeft,
  secondsLeftWhenShown,
  onClickDismiss,
}: Props) {
  const { t, loading: tLoading } = useTranslationsGql({
    header: `${cmsPrefix}.rr_starting_notification_header`,
    subheader: `${cmsPrefix}.rr_starting_notification_subheader`,
  });

  if (tLoading || secondsLeft <= 0) {
    return null;
  }

  const progressToStart =
    ((secondsLeftWhenShown - secondsLeft) / secondsLeftWhenShown) * 100;

  return (
    <Flex
      direction="horizontal"
      className="u-padding u-padding-x--md t-background-white t-border-r"
      align="center"
    >
      <Flex.Item className="u-position-relative">
        <ProgressCircle
          className="u-width--3xlg c-rr-starting-notification__progress"
          bgColor="grey-0"
          value={progressToStart}
        />
        <Text
          size="md"
          className="u-font-weight-bold u-position-absolute u-inset-x u-text-align-center t-color-black u-margin-top--none c-rr-starting-notification__counter"
        >
          {secondsLeft}
        </Text>
      </Flex.Item>
      <Flex.Block>
        <Text tag="div" className="t-color-black u-font-weight-bold">
          {t.header}
        </Text>
        <Text tag="div" className="t-color-grey-50">
          {t.subheader}
        </Text>
      </Flex.Block>
      <Flex.Item>
        <div
          onClick={onClickDismiss}
          className="t-border-r--circle t-background-grey-0 u-padding u-cursor--pointer"
        >
          <CloseIcon className="t-color-black" />
        </div>
      </Flex.Item>
    </Flex>
  );
}
