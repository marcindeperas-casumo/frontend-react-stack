import React from "react";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { navigateById } from "Services/NavigationService";
import { stringToHTML } from "Utils";

export type CuratedCardHeaderSimpleProps = {
  header: string;
  isWelcomeOffer: boolean;
  launchButtonText: string;
};

const WelcomeOfferDepositButton = ({ label }: { label: string }) => (
  <ButtonPrimary
    size="md"
    id="gtm-curated-play"
    onClick={() => navigateById({ routeId: "deposit" })}
    className="u-pointer--initial u-margin-y--md u-padding-x--xlg@phablet u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop"
  >
    <span className="u-margin-left">{label}</span>
  </ButtonPrimary>
);

export const CuratedCardHeaderSimple = ({
  header,
  isWelcomeOffer,
  launchButtonText,
}: CuratedCardHeaderSimpleProps) => (
  <>
    <MobileAndTablet>
      <Text
        data-test="curated-card-header"
        className="u-margin-bottom--none u-line-height--1 u-font-weight-bold t-color-white"
        size="2xlg"
        dangerouslySetInnerHTML={stringToHTML(header)}
      />
      {isWelcomeOffer && <WelcomeOfferDepositButton label={launchButtonText} />}
    </MobileAndTablet>
    <Desktop>
      <div className="o-wrapper">
        <Text
          data-test="curated-card-header"
          className="u-margin-bottom--none u-line-height--1 u-font-weight-bold t-color-white"
          size="3xlg"
          dangerouslySetInnerHTML={stringToHTML(header)}
        />
        {isWelcomeOffer && (
          <WelcomeOfferDepositButton label={launchButtonText} />
        )}
      </div>
    </Desktop>
  </>
);
