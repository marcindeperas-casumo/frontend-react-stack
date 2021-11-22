import React from "react";
import Flex from "@casumo/cmp-flex";
import { Link } from "@reach/router";
import { useTranslatedUrl } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

type Props = {
  Button1Text: string;
  Button2Text: string;
  Button1Link: string;
  onCTAClick: () => void;
};

export const CustomCampaignCTAButtons = ({
  Button1Text,
  Button2Text,
  Button1Link,
  onCTAClick,
}: Props) => {
  const extractXMasPromotionSlug = (buttonLink: string): string => {
    if (
      !buttonLink ||
      buttonLink === null ||
      buttonLink === undefined ||
      !buttonLink.includes("/")
    ) {
      return "";
    } else {
      const buttonLinkArray = buttonLink.split("/");
      return buttonLinkArray[buttonLinkArray.length - 1];
    }
  };

  return (
    <div className="c-valuable-details__footer u-display--flex o-flex-align--center o-flex-justify--space-around o-flex-justify--space-around@mobile u-padding--md o-inset-bottom--none o-flex-justify--space-around@mobile">
      <Flex.Item className="t-border-r--pill t-background-grey-20 t-background-grey-50:hover o-flex-align--center o-flex-justify--center u-height--3xlg u-width--1/3 u-width--2/5@mobile">
        <Link
          className="t-color-black u-font-weight-bold"
          to={`/${useTranslatedUrl(
            ROUTE_IDS.PROMOTIONS
          )}/${extractXMasPromotionSlug(Button1Link)}`}
          onClick={onCTAClick}
        >
          {Button2Text}
        </Link>
      </Flex.Item>

      <Flex.Item className="t-border-r--pill t-color-black t-background-purple-50 t-background-purple-60:hover o-flex-align--center o-flex-justify--center u-height--3xlg u-width--1/3 u-width--2/5@mobile">
        <Link
          className="t-color-white u-font-weight-bold"
          to={`/${useTranslatedUrl(ROUTE_IDS.CASH_DEPOSIT)}`}
          onClick={onCTAClick}
        >
          {Button1Text}
        </Link>
      </Flex.Item>
    </div>
  );
};
