import React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { TickIcon } from "@casumo/cmp-icons";

export const Finish = ({
  playOkayInfoText,
  buttonLabel,
  acceptModal,
  limitSavedInfoText,
}) => (
  <div className="u-padding-x--lg u-padding-bottom--xlg u-overflow-y--auto">
    <div className="u-padding u-padding-top-lg">
      <TickIcon size="xlg" className="t-color-purple-60" />
      <Text className="t-color-purple-60 u-font-2xlg u-font-weight-bold">
        {limitSavedInfoText}
      </Text>
      <div className="u-padding-top">{playOkayInfoText}</div>
    </div>
    <div className="u-padding u-padding-top-lg">
      <Button
        className="u-width--full"
        variant="primary"
        size="md"
        onClick={acceptModal}
      >
        {buttonLabel}
      </Button>
    </div>
  </div>
);
