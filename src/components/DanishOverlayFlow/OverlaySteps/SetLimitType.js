// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { limitPeriod } from "Models/playOkay";

const ButtonElement = ({ text, onClick }) => (
  <Flex.Item>
    <Button
      onClick={onClick}
      size="sm"
      className="u-font-2xs u-display--block"
      variant="secondary"
    >
      <Flex direction="vertical">
        <div>{text.toUpperCase()}</div>
        <div>+</div>
      </Flex>
    </Button>
  </Flex.Item>
);

type Props = {
  t: any,
  chooseLimitType: string => void,
};

export const SetLimitType = ({ t, chooseLimitType }: Props) => (
  <div className="u-padding-x--lg u-padding-bottom--xlg u-overflow-y--auto">
    <Text className="u-padding-x u-padding-y--lg">{t.modal_description}</Text>
    <Flex
      direction="horizontal"
      spacing="md"
      justify="center"
      align="center"
      className="u-padding"
    >
      <ButtonElement
        onClick={() => chooseLimitType(limitPeriod.DAILY)}
        text={t.limit_type_daily}
      />
      <ButtonElement
        onClick={() => chooseLimitType(limitPeriod.WEEKLY)}
        text={t.limit_type_weekly}
      />
      <ButtonElement
        onClick={() => chooseLimitType(limitPeriod.MONTHLY)}
        text={t.limit_type_monthly}
      />
    </Flex>
  </div>
);
