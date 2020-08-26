import React from "react";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { CheckIcon } from "@casumo/cmp-icons";

export const Finish = ({
  playOkayInfoText,
  buttonLabel,
  acceptModal,
  limitSavedInfoText,
}) => (
  <div className="u-padding-x--lg u-padding-bottom--xlg u-overflow-y--auto">
    <div className="u-padding u-padding-top-lg">
      <CheckIcon size="xlg" className="t-color-purple-60" />
      <Text className="t-color-purple-60 u-font-2xlg u-font-weight-bold">
        {limitSavedInfoText}
      </Text>
      <div className="u-padding-top">{playOkayInfoText}</div>
    </div>
    <div className="u-padding u-padding-top-lg">
      <ButtonPrimary className="u-width--full" size="md" onClick={acceptModal}>
        {buttonLabel}
      </ButtonPrimary>
    </div>
  </div>
);
