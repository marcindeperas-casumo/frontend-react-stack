import { CheckIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as React from "react";
import DangerousHtml from "Components/DangerousHtml";
import {
  formatWithDateMedium,
  parseChangelog,
} from "./termsAndConditions.utils";
import "./changelog.scss";

type Props = {
  t: {
    changelog_title: string;
    date_changes_accepted: string;
  };
  changelog: string;
  ackTimestamp: number | undefined;
};

export function Changelog({ t, ...props }: Props) {
  return (
    <Flex
      direction="vertical"
      className="u-margin--md u-padding-x--md u-padding-y--lg t-border-r bg-grey-0"
    >
      <Text
        tag="span"
        size="xs"
        className="u-font-weight-bold u-margin-bottom--md"
      >
        {t.changelog_title}
      </Text>
      {parseChangelog(props.changelog).map(({ section, changes }) => (
        <Flex key={section}>
          <Text
            tag="span"
            size="xs"
            className="u-font-weight-black c-changelog__section-number u-margin-right"
          >
            {section}
          </Text>
          <Text tag="span" size="xs" className="c-changelog__section-content">
            {changes}
          </Text>
        </Flex>
      ))}
      {props.ackTimestamp && (
        <Flex className="text-green-30 u-margin-top--md" align="center">
          <CheckIcon
            className="c-tac-changelog-approved u-margin-right"
            size="sm"
          />
          <Text tag="span" size="sm" className="c-changelog__section-content">
            <DangerousHtml
              html={formatWithDateMedium(
                t.date_changes_accepted,
                props.ackTimestamp
              )}
            />
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
