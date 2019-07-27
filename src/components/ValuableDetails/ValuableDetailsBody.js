//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

type Translations = {
  termsAndConditionLabel: string,
  expiresInLabel: string,
};

type Props = {
  /* Details description of the valuable */
  details: string,
  /* Expiration vaue for the valuable to expire */
  expirationValueText: string,
  /* Valuable caveat */
  caveat: string,
  /* Content for terms and conditions */
  termsContent: string,
  /* Translations of the component */
  translations: Translations,
};

export const ValuableDetailsBody = ({
  details,
  expirationValueText,
  caveat,
  termsContent,
  translations,
}: Props) => {
  const { termsAndConditionLabel, expiresInLabel } = translations;
  const expirationLabel = `${expiresInLabel} ${expirationValueText}`;

  return (
    <Flex direction="vertical" align="center" className="u-padding-x--md">
      <Flex.Item>
        <Text tag="p" size="md">
          {details}
        </Text>
      </Flex.Item>
      <Flex.Item className="u-margin-top--lg">
        <ValuableDetailsExpirationLabel
          text={expirationLabel}
          className="t-background-red"
        />
      </Flex.Item>
      <Flex.Item className="u-margin-top--lg">
        <Text tag="p" className="t-color-grey" size="sm">
          {caveat}
        </Text>
      </Flex.Item>
      <Flex.Item className="u-width--1/3 u-margin-y--xlg">
        <hr className="t-color-grey-light-2 u-ruler-sm" />
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
