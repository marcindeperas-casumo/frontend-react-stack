// @flow
import React, { type Node } from "react";
import Flex from "@casumo/cmp-flex";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import MaskImage from "Components/MaskImage";
import { interpolate, convertHoursToDays } from "Utils";

export const expirationBadgeClasses = {
  red: "t-background-red",
  grey: "t-background-grey-light-1",
};

type badgeInfoType = {
  key: string,
  value: number,
};

type DurationTranslations = {
  hours: {
    plural: string,
    singular: string,
  },
  days: {
    plural: string,
    singular: string,
  },
};

type Translations = DurationTranslations & {
  playNowLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  termsAndConditionLabel: string,
  expirationTimeLabel: string,
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

// TODO: to move this to somewhere more localised
// TODO: add other formats
// Issue: https://jira.casumocave.com/browse/PRR-65
export const getDurationTranslation = (
  expiration: badgeInfoType,
  translations: DurationTranslations
): $Keys<DurationTranslations> => {
  const { key, value } = expiration;
  const { singular, plural } = translations[key];

  return value > 1 ? plural : singular;
};

export class ValuableDetails extends React.PureComponent<Props> {
  get isLessThan24Hours() {
    return this.props.expirationTimeInHours <= 24;
  }

  get expirationBadgeInfo(): badgeInfoType {
    const { expirationTimeInHours } = this.props;

    return this.isLessThan24Hours
      ? { key: "hours", value: expirationTimeInHours }
      : { key: "days", value: convertHoursToDays(expirationTimeInHours) };
  }

  render() {
    const {
      id,
      backgroundImageUrl,
      details,
      caveat,
      termsContent,
      expirationTimeInHours,
      translations,
      children,
    } = this.props;
    const { termsAndConditionLabel, expirationTimeLabel } = translations;

    const expirationInfo = this.expirationBadgeInfo;
    const translatedDuration = getDurationTranslation(
      expirationInfo,
      translations
    );
    const expirationValueText = interpolate(translatedDuration, {
      value: expirationInfo.value,
    });

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
                data-test="valuable-expiration-badge"
                className={classNames(
                  "u-text-transform-uppercase u-font-weight-bold",
                  expirationTimeInHours > 24 && expirationBadgeClasses.grey
                )}
              >
                {`${expirationTimeLabel} ${expirationValueText}`}
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
              <Text
                tag="p"
                className="t-color-grey u-text-align-left"
                size="sm"
              >
                {termsContent}
              </Text>
            </Flex.Item>
          </Flex>
        </div>
      </>
    );
  }
}
