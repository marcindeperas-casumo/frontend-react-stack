// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import { useInterval } from "react-use";
import { ProgressCircle } from "Components/Progress";
import { useTranslationsGql } from "Utils/hooks";

import "./ReelRaceStartingNotification.scss";

const cmsPrefix = "root:iframe-solution:fields";

type Props = {
  secondsToStart: number,
};

export function ReelRaceStartingNotification({ secondsToStart }: Props) {
  const [secondsLeft, setSecondsLeft] = React.useState(secondsToStart);
  const relativeTimeToStart =
    ((secondsToStart - secondsLeft) / secondsToStart) * 100;
  const [dismissed, setDismissed] = React.useState(false);
  const { t } = useTranslationsGql({
    header: `${cmsPrefix}.rr_starting_notification_header`,
    subheader: `${cmsPrefix}.rr_starting_notification_subheader`,
  });

  useInterval(() => {
    setSecondsLeft(secondsLeft - 1);
  }, 1000);

  if (dismissed || secondsLeft < 0) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      className="u-padding u-padding-x--md t-background-white t-border-r"
      align="center"
    >
      <Flex.Item className="u-position-relative">
        <ProgressCircle className="u-width--3xlg" value={relativeTimeToStart} />
        <Text
          size="md"
          className="u-font-weight-bold u-position-absolute u-inset-x u-text-align-center t-color-black c-rr-starting-notification__counter"
        >
          {secondsLeft}
        </Text>
      </Flex.Item>
      <Flex.Block className="u-margin-right--3xlg">
        <Text tag="div" className="t-color-black u-font-weight-bold">
          {t.header}
        </Text>
        <Text tag="div" className="t-color-grey-50">
          {t.subheader}
        </Text>
      </Flex.Block>
      <Flex.Item>
        <div
          onClick={() => setDismissed(true)}
          className="t-border-r--circle t-background-grey-0 u-padding u-cursor--pointer"
        >
          <CloseIcon className="t-color-black" />
        </div>
      </Flex.Item>
    </Flex>
  );
}
