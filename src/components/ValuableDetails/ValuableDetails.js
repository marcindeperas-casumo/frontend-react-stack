// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { pick } from "ramda";
import MaskImage from "Components/MaskImage";
import { ValuableDetailsBody } from "./ValuableDetailsBody";
import "./ValuableDetails.scss";

type Translations = {
  /* Label for the expration badge */
  expiresInLabel: string,
  /* Label for the Play Now button */
  playNowLabel: string,
  /* Label for the Play to unlock button */
  playToUnlockLabel: string,
  /* Label for the deposit now button */
  deopsitToUnlockLabel: string,
  /* Label for the terms and condition */
  termsAndConditionLabel: string,
};

type Props = {
  /* Unique id of valuable */
  id: string,
  /* Url of the background image to be used in the header */
  backgroundImageUrl: string,
  /* Details description of the Valuable */
  details: string,
  /* Caveat for the valuable */
  caveat: string,
  /* Content for Terms and conditions */
  termsContent: string,
  /* Translations for the Valuable Details compoinent */
  translations: Translations,
};

const dimensions = {
  width: 379,
  height: 271,
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
  translations,
}: Props) => {
  const bodyTranslations = pick(
    ["expiresInLabel", "termsAndConditionLabel"],
    translations
  );

  return (
    <div>
      <Flex.Block>
        <MaskImage
          className="c-valuable-details__header"
          id={`${id}-detail`}
          imageUrl={backgroundImageUrl}
          {...dimensions}
        >
          <HeaderImgMask />
        </MaskImage>
      </Flex.Block>
      <Flex.Item align="center">
        <div className="u-drop-shadow--md u-text-align-center c-valuable-details__card-container"></div>
        <ValuableDetailsBody
          details={details}
          expirationValueText="2 Hours"
          caveat={caveat}
          termsContent={termsContent}
          translations={bodyTranslations}
        />
      </Flex.Item>
    </div>
  );
};
