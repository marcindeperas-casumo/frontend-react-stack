// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { TickIcon } from "@casumo/cmp-icons";

type Props = {
  t: {
    time_limits_form_outro_copy_initial: string,
    time_limits_form_outro_copy_decreasing: string,
    time_limits_form_outro_copy_increasing: string,
    time_limits_form_outro_cta: string,
  },
  onClickCta: () => void,
};

export function TimeLimitsFormOutro({ t, onClickCta }: Props) {
  return (
    <Flex
      direction="vertical"
      spacing="md"
      align="stretch"
      className="u-padding-top--md u-padding u-padding--lg@desktop"
    >
      <Flex.Item className="u-text-align-center">
        <TickIcon size="lg" className="t-color-green" />
      </Flex.Item>
      <Flex.Item>
        <Text className="u-text-align-center u-margin-bottom--5xlg">
          {t.time_limits_form_outro_copy_initial}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Button
          onClick={onClickCta}
          variant="primary"
          size="md"
          className="u-width--full u-margin-top--5xlg"
        >
          {t.time_limits_form_outro_cta}
        </Button>
      </Flex.Item>
    </Flex>
  );
}
