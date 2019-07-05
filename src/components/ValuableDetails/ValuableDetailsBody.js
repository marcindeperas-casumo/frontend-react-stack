//@flow
import React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableDetailsExpirationLabel as ExpirationLabel } from "./ValuableDetailsExpirationLabel";

type Props = {
  title: string,
  expirationTime: DateTime,
  caveat: string,
  termsTitle: string,
  termsContent: string,
};

export const ValuableDetailsBody = ({
  title,
  expirationTime,
  caveat,
  termsTitle,
  termsContent,
}: Props) => (
  <Flex.Item className="u-text-align-center u-padding-top--lg u-margin-top--none">
    <div className="u-padding-x--lg">
      <Text tag="p" size="md" className="u-padding-y--md u-margin-bottom--none">
        {title}
      </Text>
      <ExpirationLabel
        time={expirationTime}
        className="u-margin-top--sm u-margin-bottom--md"
      >
        {value => `Expires ${value}`}
      </ExpirationLabel>
      <Text
        tag="p"
        className="u-margin-top--md u-margin-bottom--none t-color-grey"
        size="sm"
      >
        {caveat}
      </Text>
      <hr className="u-margin-y--xlg u-width--1/3 u-opacity-28" />
      <Text tag="strong" className="t-color-grey" size="sm">
        {termsTitle}
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
