// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import PlayOkayIcon from "./playokay.svg";
import TimeLimitIcon from "./timeLimit.svg";

type Props = {
  t: {
    time_limits_form_intro_header: string,
    time_limits_form_intro_copy: string,
    time_limits_form_intro_cta: string,
  },
  onClickCta: () => void,
};

export function TimeLimitsFormIntro({ t, onClickCta }: Props) {
  return (
    <Flex
      direction="vertical"
      spacing="md"
      className="u-padding--md u-padding--lg@desktop u-padding--lg@tablet"
    >
      <Flex.Item>
        <PlayOkayIcon />
      </Flex.Item>
      <Flex.Item>
        <Text size="md" className="u-font-weight-black t-color-plum-dark-1">
          {t.time_limits_form_intro_header}
        </Text>
      </Flex.Item>
      <Flex.Item className="u-margin-bottom--5xlg">
        <Flex direction="horizontal" spacing="md">
          <Flex.Item>
            <TimeLimitIcon className="o-flex__item--no-shrink" />
          </Flex.Item>
          <Flex.Item>
            <Text>{t.time_limits_form_intro_copy}</Text>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item>
        <Button
          onClick={onClickCta}
          variant="primary"
          size="md"
          className="u-width--full u-margin-top--5xlg"
        >
          {t.time_limits_form_intro_cta}
        </Button>
      </Flex.Item>
    </Flex>
  );
}
