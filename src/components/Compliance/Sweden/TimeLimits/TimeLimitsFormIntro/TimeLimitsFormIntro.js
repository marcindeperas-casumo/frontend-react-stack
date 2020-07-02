// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import PlayOkayIcon from "./playokay.svg";
import TimeLimitIcon from "./timeLimit.svg";

type Props = {
  t: {
    form_intro_header: ?string,
    form_intro_copy: ?string,
    form_intro_cta: ?string,
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
          {t.form_intro_header}
        </Text>
      </Flex.Item>
      <Flex.Item className="u-margin-bottom--5xlg">
        <Flex direction="horizontal" spacing="md">
          <Flex.Item>
            <TimeLimitIcon className="o-flex__item--no-shrink" />
          </Flex.Item>
          <Flex.Item>
            <Text>{t.form_intro_copy}</Text>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item>
        <ButtonPrimary
          onClick={onClickCta}
          size="md"
          className="u-width--full u-margin-top--5xlg"
        >
          {t.form_intro_cta || ""}
        </ButtonPrimary>
      </Flex.Item>
    </Flex>
  );
}
