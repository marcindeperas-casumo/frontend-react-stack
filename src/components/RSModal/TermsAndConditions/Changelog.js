// @flow
import * as React from "react";
import { TickIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import { formatWithDateMedium } from "./termsAndConditions.utils";

type Props = {
  t: {
    changelog_title: string,
    date_changes_accepted: string,
  },
  locale: string,
  changelog: string,
  ackTimestamp: number,
};

export function Changelog({ t, ...props }: Props) {
  const changesAcceptedHTML = formatWithDateMedium(
    t.date_changes_accepted,
    props.ackTimestamp,
    props.locale
  );

  return (
    <Flex
      direction="vertical"
      className="u-margin--md u-padding--md t-border-r t-background-grey-light-2"
    >
      <Text className="u-font-weight-bold">{t.changelog_title}</Text>
      <DangerousHtml className="u-padding-y--md" html={props.changelog} />
      <Flex className="t-color-chrome-dark-1" align="center">
        <TickIcon
          className="c-tac-changelog-approved u-margin-right"
          size="sm"
        />
        <DangerousHtml html={changesAcceptedHTML} />
      </Flex>
    </Flex>
  );
}
