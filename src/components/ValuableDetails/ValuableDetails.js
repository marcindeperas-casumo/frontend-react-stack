// @flow
import React, { type Node } from "react";
import { equals } from "ramda";
import Flex from "@casumo/cmp-flex";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import Button from "@casumo/cmp-button";
import {
  shouldUseValuable,
  type ValuableDetailsTranslations as Translations,
  VALUABLE_STATES,
  VALUABLE_TYPES,
  getValuableDetailsAction,
  durationToTranslationKey,
  type ValuableDetailsProps,
} from "Models/valuables";
import MaskImage from "Components/MaskImage";
import { interpolate, convertHoursToDays } from "Utils";
import OpenPadlock from "./open-padlock.svg";
import "./ValuableDetails.scss";

export const expirationBadgeClasses = {
  red: "t-background-red",
  grey: "t-background-grey-light-1",
};

type BadgeInfoType = {
  key: string,
  value: number,
};

type Props = ValuableDetailsProps & {
  /* Translated labels of the component */
  translations: Translations,
  /* Valuable component to be displayed in the header*/
  children: Node,
};

const HeaderImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);

const ActionButtonContent = ({ isLocked, text }) => {
  return (
    <>
      {isLocked && (
        <span className="u-margin-right">
          <OpenPadlock />
        </span>
      )}
      {text}
    </>
  );
};

export class ValuableDetails extends React.PureComponent<Props> {
  get expiresWithin24Hours() {
    return this.props.expirationTimeInHours <= 24;
  }

  get expirationBadgeInfo(): BadgeInfoType {
    const { expirationTimeInHours } = this.props;

    return this.expiresWithin24Hours
      ? { key: "hours", value: expirationTimeInHours }
      : { key: "days", value: convertHoursToDays(expirationTimeInHours) };
  }

  // TODO: to check what happens unable to consume.
  handleAction = () => {
    const {
      valuableType,
      valuableState,
      id,
      onConsumeValuable,
      onLaunchGame,
    } = this.props;
    const slug = "starburst";
    if (shouldUseValuable(valuableType, valuableState)) {
      console.log("valuable consumed");
      onConsumeValuable(id);
    }

    console.log("valuable WON'T be consumed");

    if (equals(valuableType, VALUABLE_TYPES.SPINS)) {
      onLaunchGame(slug);
    }
  };

  render() {
    const {
      id,
      backgroundImage,
      content,
      caveat,
      expirationTimeInHours,
      valuableType,
      valuableState,
      requirementType,
      translations,
      children,
    } = this.props;
    const {
      termsAndConditionLabel,
      expirationTimeLabel,
      termsAndConditionsContent,
    } = translations;

    const expirationInfo = this.expirationBadgeInfo;
    const durationKey = durationToTranslationKey(
      expirationInfo.key,
      expirationInfo.value
    );

    const expirationValueText =
      translations[durationKey] &&
      interpolate(translations[durationKey], {
        value: expirationInfo.value,
      });

    const actionButtonProps = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    return (
      <div>
        <div className="o-ratio o-ratio--valuable-details">
          <div className="o-ratio__content c-valuable-details__header">
            <MaskImage
              id={`${id}-detail`}
              imageUrl={backgroundImage}
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
        <div className="u-margin-top--2xlg u-padding-x--md">
          <Flex direction="vertical" align="center">
            <Flex.Item>
              <Text className="center" tag="p" size="md">
                {content}
              </Text>
            </Flex.Item>
            <Flex.Item className="u-margin-top--lg">
              <Badge
                tag="p"
                size="sm"
                data-test="valuable-expiration-badge"
                className={classNames(
                  "u-text-transform-uppercase u-font-weight-bold",
                  expirationTimeInHours >= 24 && expirationBadgeClasses.grey
                )}
                radius="sm"
              >
                {`${expirationTimeLabel} ${expirationValueText}`}
              </Badge>
            </Flex.Item>
            <Flex.Item className="u-margin-top--lg">
              <Text tag="p" className="t-color-grey" size="sm">
                {caveat != null && caveat}
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
                {termsAndConditionsContent}
              </Text>
            </Flex.Item>
          </Flex>
          <div className="c-valuable-details__footer">
            <Button
              href={actionButtonProps.url}
              className="u-width--1/1"
              onClick={this.handleAction}
            >
              <ActionButtonContent
                text={actionButtonProps.text}
                isLocked={equals(valuableState, VALUABLE_STATES.LOCKED)}
                data-test="expiration-badge-content"
              />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
