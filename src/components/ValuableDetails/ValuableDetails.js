// @flow
import React, { type Node } from "react";
import Flex from "@casumo/cmp-flex";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import MaskImage from "Components/MaskImage";

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
  /* Hours left for the bonus to expire */
  expirationTimeInHours: number,
  translations: Translations,
  /* Valuable component to be displayed in the header*/
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
  expirationTimeInHours,
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
        <Flex direction="vertical" align="center" className="u-padding-x--md">
          <Flex.Item>
            <Text tag="p" size="md">
              {details}
            </Text>
          </Flex.Item>
          <Flex.Item className="u-margin-top--lg">
            <Badge
              tag="p"
              size="sm"
              className={classNames(
                "u-text-transform-uppercase u-font-weight-bold",
                expirationTimeInHours > 24 && "t-background-grey-light-1"
              )}
            >
              Expires In {expirationTimeInHours} HOURS
            </Badge>
          </Flex.Item>
          <Flex.Item className="u-margin-top--lg">
            <Text tag="p" className="t-color-grey" size="sm">
              {caveat}
            </Text>
          </Flex.Item>
          <Flex.Item className="u-width--1/3 u-margin-y--xlg">
            <hr className="t-color-grey-light-2 t-border-width--md t-border-r--pill" />
          </Flex.Item>
          <Flex.Item>
            <Text tag="strong" className="t-color-grey" size="sm">
              {termsAndConditionLabel}
            </Text>
          </Flex.Item>
          <Flex.Item>
            <Text tag="p" className="t-color-grey u-text-align-left" size="sm">
              {termsContent}
            </Text>
          </Flex.Item>
        </Flex>
      </div>
    </>
  );
};
