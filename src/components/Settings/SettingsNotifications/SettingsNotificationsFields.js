//@flow
import React, { type Node } from "react";
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
  title: string,
  interval: number,
  frequencyLabel: string,
  frequencyOffLabel: string,
  enabled: boolean,
}) => (
  <SettingsRow
    text={
      <Text
        tag="p"
        size="sm"
        className="t-color-grey-dark-3 u-font-weight-light"
      >
        {title}
      </Text>
    }
  >
    {interval ? (
      <Text tag="span" className="t-color-green u-font-weight-light">
        <ContentReplacer
          value={frequencyLabel}
          replacements={{ amount: interval }}
        />
      </Text>
    ) : (
      <Text tag="span" className="t-color-grey-light-1 u-font-weight-light">
        {frequencyOffLabel}
      </Text>
    )}
    {enabled && <DirectionRightIcon className="t-color-grey-light-1" />}
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
  title: string,
  interval: number,
  frequencyLabel: string,
  frequencyOffLabel: string,
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
