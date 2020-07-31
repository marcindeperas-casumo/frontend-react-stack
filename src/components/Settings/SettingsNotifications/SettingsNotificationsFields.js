//@flow
import React, { type Node } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { ContentReplacer } from "Components/ContentReplacer";

const RealityCheck = ({
  title,
  interval,
  frequencyLabel,
  frequencyOffLabel,
  enabled,
}: {
  title: ?string,
  interval: number,
  frequencyLabel: ?string,
  frequencyOffLabel: ?string,
  enabled: boolean,
}) => (
  <SettingsRow text={<Text className="t-color-grey-70">{title}</Text>}>
    <Flex justify="center">
      {interval ? (
        <Text tag="span" className="t-color-purple-60 u-font-weight-bold">
          <ContentReplacer
            value={frequencyLabel || ""}
            replacements={{ amount: interval }}
          />
        </Text>
      ) : (
        <Text tag="span" className="t-color-grey-20 u-font-weight-bold">
          {frequencyOffLabel}
        </Text>
      )}
      {enabled && <DirectionRightIcon className="t-color-grey-5" />}
    </Flex>
  </SettingsRow>
);

const LinkOrNode = ({
  enabled,
  link,
  children,
}: {
  enabled: boolean,
  link: string,
  children: Node,
}) => (enabled ? <a href={link}>{children}</a> : children);

export const RealityCheckField = ({
  link,
  enabled,
  title,
  interval,
  frequencyLabel,
  frequencyOffLabel,
}: {
  link: string,
  enabled: boolean,
  title: ?string,
  interval: number,
  frequencyLabel: ?string,
  frequencyOffLabel: ?string,
  enabled: boolean,
}) => (
  <LinkOrNode link={link} enabled={enabled}>
    <RealityCheck
      title={title}
      interval={interval}
      frequencyLabel={frequencyLabel}
      frequencyOffLabel={frequencyOffLabel}
      enabled={enabled}
    />
  </LinkOrNode>
);
