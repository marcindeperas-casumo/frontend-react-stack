// @flow
import React, { type Node } from "react";
import Flex from "@casumo/cmp-flex";
import MaskImage from "Components/MaskImage";
import { ValuableDetailsBody } from "./ValuableDetailsBody";

type Translations = {
  playNowLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  termsAndConditionLabel: string,
};

type Props = {
  id: string,
  /* Url of the background image to be used in the header */
  backgroundImageUrl: string,
  /* Detailed description of the Valuable */
  details: string,
  /* Caveat for the valuable */
  caveat: string,
  /* Content for Terms and conditions */
  termsContent: string,
  /* Expiration Text to display in the expiration badge */
  expirationText: string,
  translations: Translations,
  /* A component to render to be displayed in the header*/
  children: Node,
};

const HeaderImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);

export const ValuableDetails = ({
  id,
  backgroundImageUrl,
  details,
  caveat,
  termsContent,
  expirationText,
  translations,
  children,
}: Props) => {
  const { termsAndConditionLabel } = translations;

  return (
    <>
      <div className="o-ratio o-ratio--valuable-details">
        <div className="o-ratio__content c-valuable-details__header">
          <MaskImage
            id={`${id}-detail`}
            imageUrl={backgroundImageUrl}
            width={375}
            height={334}
          >
            <HeaderImgMask />
          </MaskImage>
        </div>
        <Flex
          className="o-ratio__content"
          justify="end"
          align="center"
          direction="vertical"
        >
          <div data-test-id="valuable-renderer-wrapper">{children}</div>
        </Flex>
      </div>
      <div className="u-margin-top--2xlg">
        <ValuableDetailsBody
          details={details}
          expirationText={expirationText}
          caveat={caveat}
          termsContent={termsContent}
          termsAndConditionLabel={termsAndConditionLabel}
        />
      </div>
    </>
  );
};
