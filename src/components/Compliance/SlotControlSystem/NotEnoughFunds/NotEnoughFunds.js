// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import NotEnoughFundsImage from "./NotEnoughFunds.svg";

type Props = {
  onClick: () => void,
  t: {
    not_enough_funds: string,
    not_enough_funds_subtext: string,
    not_enough_funds_button_label: string,
  },
};

export function NotEnoughFunds(props: Props) {
  const { t, onClick } = props;

  return (
    <Flex direction="vertical">
      <NotEnoughFundsImage />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-plum-dark-1 u-padding u-margin-top--lg"
      >
        {t.not_enough_funds}
      </Text>
      <Text className="u-padding u-margin-bottom--2xlg">
        {t.not_enough_funds_subtext}
      </Text>
      <Button
        size="md"
        variant="primary"
        onClick={onClick}
        className="u-width--full u-margin-top--3xlg"
      >
        {t.not_enough_funds_button_label}
      </Button>
    </Flex>
  );
}
