//@flow
import React from "react";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import "./ValuableDetails.scss";

type Translations = {
  expiresIn: string,
};

type Props = {
  expirationText: string,
  translations: Translations,
  className?: string,
};

export const ValuableDetailsExpirationLabel = ({
  expirationText,
  translations,
  className,
}: Props) => {
  const { expiresIn } = translations;

  return (
    <div
      className={classNames(
        "u-display--inline-block u-text-transform-uppercase t-background-red u-padding-x--md u-padding-y--sm c-valuable-details__pill",
        className
      )}
    >
      <Text tag="span" size="sm" className="t-color-white u-font-weight-bold">
        {expiresIn} {expirationText}
      </Text>
    </div>
  );
};
