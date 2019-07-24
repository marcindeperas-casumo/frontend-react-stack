//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

// TODO: to go back to naming
type Translations = {
  termsAndConditionLabel: string,
  expiresIn: string,
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
  const { termsAndConditionLabel, expiresIn } = translations;
  const expirationLabel = `${expiresIn} ${expirationValueText}`;

  return (
    <Flex.Item className="u-text-align-center u-padding-top--lg u-margin-top--none">
      <div className="u-padding-x--lg">
        <Text
          tag="p"
          size="md"
          className="u-padding-y--md u-margin-bottom--none"
        >
          {details}
        </Text>
        <ValuableDetailsExpirationLabel
          text={expirationLabel}
          className="t-background-red" // u-margin-top--sm u-margin-bottom--md
        />
        <Text
          tag="p"
          className="u-margin-top--md u-margin-bottom--none t-color-grey"
          size="sm"
        >
          {caveat}
        </Text>
        <hr className="u-margin-y--xlg u-width--1/3 u-opacity-28" />
        <Text tag="strong" className="t-color-grey" size="sm">
          {termsAndConditionLabel}
        </Text>
      </div>
      <Text
        tag="p"
        className="t-color-grey u-margin-top--md u-padding-x--md u-text-align-left"
        size="sm"
      >
        {termsContent}
      </Text>
    </Flex.Item>
  );
};
