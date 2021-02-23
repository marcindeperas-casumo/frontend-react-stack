// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { navigateById } from "Services/NavigationService";
import NotEnoughFundsImage from "./NotEnoughFunds.svg";
import "./NotEnoughFunds.scss";

type Props = {
  onClick: () => void,
  t: {
    not_enough_funds: string,
    not_enough_funds_subtext: string,
    not_enough_funds_button_label: string,
  },
};

export function NotEnoughFunds(props: Props) {
  const { t } = props;
  const onClick = () => {
    props.onClick();
    navigateById({ routeId: "deposit" });
  };

  return (
    <Flex direction="vertical">
      <NotEnoughFundsImage className="c-scs__not-enough-funds__image" />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-purple-80 u-padding u-margin-top--lg"
      >
        {t.not_enough_funds}
      </Text>
      <Text className="u-padding u-margin-bottom--2xlg">
        {t.not_enough_funds_subtext}
      </Text>
      <ButtonPrimary
        size="md"
        onClick={onClick}
        className="u-width--full u-margin-top--3xlg"
      >
        {t.not_enough_funds_button_label}
      </ButtonPrimary>
    </Flex>
  );
}
