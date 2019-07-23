//@flow
import React from "react";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import "./ValuableDetails.scss";

type Translations = {
  expiresIn: string,
};

type Props = {
  /* Free text expiration time to be displayed */
  expirationText: string,
  /* Translations of the component */
  translations: Translations,
  /* The classnames for background and font colors. by default red and white respectively */
  colorClassNames?: string,
  /* Any additional classnames */
  className?: string,
};

export const defaultColor = "t-color-white";
export const defaultBackground = "t-background-red";

export const ValuableDetailsExpirationLabel = ({
  expirationText,
  translations,
  colorClassNames,
  className,
}: Props) => {
  const { expiresIn } = translations;

  return (
    <div
      className={classNames(
        "u-display--inline-block u-text-transform-uppercase u-padding-x--md u-padding-y--sm c-valuable-details__expiration-label",
        colorClassNames || `${defaultColor} ${defaultBackground}`
      )}
    >
      <Text tag="span" size="sm" className="u-font-weight-bold">
        {expiresIn} {expirationText}
      </Text>
    </div>
  );
};
