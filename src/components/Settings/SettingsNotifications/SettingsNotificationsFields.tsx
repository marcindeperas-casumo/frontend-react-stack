import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { ContentReplacer } from "Components/ContentReplacer";

const RealityCheck = ({
  title,
  interval,
  frequencyLabel,
  frequencyOffLabel,
  enabled,
}: {
  title: string | undefined;
  interval: number;
  frequencyLabel: string | undefined;
  frequencyOffLabel: string | undefined;
  enabled: boolean;
}) => (
  <SettingsRow text={<Text className="text-grey-70">{title}</Text>}>
    <Flex justify="center">
      {interval ? (
        <Text tag="span" className="text-purple-60 u-font-weight-bold">
          <ContentReplacer
            value={frequencyLabel || ""}
            replacements={{ amount: interval }}
          />
        </Text>
      ) : (
        <Text tag="span" className="text-grey-20 u-font-weight-bold">
          {frequencyOffLabel}
        </Text>
      )}
      {enabled && <ArrowRightIcon className="text-grey-5" />}
    </Flex>
  </SettingsRow>
);

const LinkOrNode = ({
  enabled,
  link,
  children,
}: {
  enabled: boolean;
  link: string;
  children: React.ReactChild;
}) => <>{enabled ? <a href={link}>{children}</a> : children}</>;

export const RealityCheckField = ({
  link,
  enabled,
  title,
  interval,
  frequencyLabel,
  frequencyOffLabel,
}: {
  link: string;
  enabled: boolean;
  title: string | undefined;
  interval: number;
  frequencyLabel: string | undefined;
  frequencyOffLabel: string | undefined;
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
