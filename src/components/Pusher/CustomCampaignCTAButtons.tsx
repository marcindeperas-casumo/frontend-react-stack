import React from "react";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import { useCrossCodebaseNavigation } from "Utils/hooks";

type Props = {
  Button1Text: string;
  Button2Text: string;
  Button1Link: string;
  Button2Link: string;
  onCTAClick: () => void;
};

export const CustomCampaignCTAButtons = ({
  Button1Text,
  Button2Text,
  Button1Link,
  Button2Link,
  onCTAClick,
}: Props) => {
  //to reconsider another navigation utility
  const { navigateToKO } = useCrossCodebaseNavigation();

  const onDepositClick = () => {
    onCTAClick();
    navigateToKO(Button1Link);
  };

  const onLearnMoreClick = () => {
    onCTAClick();
    navigateToKO(Button2Link);
  };

  return (
    <div className="c-valuable-details__footer u-display--flex o-flex-align--center o-flex-justify--space-around o-flex-justify--space-around@mobile u-padding--md o-inset-bottom--none o-flex-justify--space-around@mobile">
      <ButtonSecondary
        className="t-background-grey-40 u-width--1/3 u-width--2/5@mobile"
        onClick={onDepositClick}
      >
        {Button2Text || "Tell me more"}
      </ButtonSecondary>
      <ButtonPrimary
        className=" u-width--1/3 u-width--2/5@mobile"
        onClick={onLearnMoreClick}
      >
        {Button1Text || "Deposit"}
      </ButtonPrimary>
    </div>
  );
};
