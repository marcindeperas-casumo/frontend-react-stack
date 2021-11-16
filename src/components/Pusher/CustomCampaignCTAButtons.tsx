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
  //to reconsider another navigation method
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
    <div
      style={{ justifyContent: "space-evenly" }}
      className="c-valuable-details__footer u-display--flex o-flex-align--center u-padding--md o-inset-bottom--none o-flex-justify--space-around@mobile"
    >
      <ButtonSecondary
        className="t-background-grey-40 u-width--1/3 u-width--1/2@mobile"
        onClick={onLearnMoreClick}
      >
        {Button1Text || "Learn more"}
      </ButtonSecondary>
      <ButtonPrimary
        className="u-width--1/3 u-width--1/2@mobile"
        onClick={onDepositClick}
      >
        {Button2Text || "Deposit"}
      </ButtonPrimary>
    </div>
  );
};
