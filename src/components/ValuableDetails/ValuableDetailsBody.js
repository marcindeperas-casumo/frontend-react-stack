//@flow
import React from "react";
import { DateTime } from "luxon";
import { pick } from "ramda";
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
  expirationTime: DateTime,
  /* Valuable caveat */
  caveat: string,
  /* Content for terms and conditions */
  termsContent: string,
  /* Translations of the component */
  translations: Translations,
};

export const ValuableDetailsBody = ({
  details,
  expirationTime,
  caveat,
  termsContent,
  translations,
}: Props) => {
  const { termsAndConditionLabel } = translations;
  const expirationLabelTranslation = pick(["expiresIn"], translations);

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
          translations={expirationLabelTranslation}
          expirationText={expirationTime}
          className="u-margin-top--sm u-margin-bottom--md"
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
