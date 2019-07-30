//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

type Props = {
  /* Details description of the valuable */
  details: string,
  /* Expiration vaue for the valuable to expire */
  expirationText: string,
  /* Valuable caveat */
  caveat: string,
  /* Content for terms and conditions */
  termsContent: string,
  /* Translated label for terms and conditions */
  termsAndConditionLabel: string,
};

export const ValuableDetailsBody = ({
  details,
  expirationText,
  caveat,
  termsContent,
  termsAndConditionLabel,
}: Props) => {
  return (
    <Flex direction="vertical" align="center" className="u-padding-x--md">
      <Flex.Item>
        <Text tag="p" size="md">
          {details}
        </Text>
      </Flex.Item>
      <Flex.Item className="u-margin-top--lg">
        <ValuableDetailsExpirationLabel
          text={expirationText}
          className="t-background-red"
        />
      </Flex.Item>
      <Flex.Item className="u-margin-top--lg">
        <Text tag="p" className="t-color-grey" size="sm">
          {caveat}
        </Text>
      </Flex.Item>
      <Flex.Item className="u-width--1/3 u-margin-y--xlg">
        <hr className="t-color-grey-light-2 t-border-width--md t-border-r--pill" />
      </Flex.Item>
      <Flex.Item>
        <Text tag="strong" className="t-color-grey" size="sm">
          {termsAndConditionLabel}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text tag="p" className="t-color-grey u-text-align-left" size="sm">
          {termsContent}
        </Text>
      </Flex.Item>
    </Flex>
  );
};
