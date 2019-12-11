// @flow
import React, { useState } from "react";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { CrossIcon, LockIcon } from "@casumo/cmp-icons";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import {
  getExpiryTimeLeft,
  type ValuableThumbnailTranslations,
  VALUABLE_STATES,
} from "Models/valuables";
import * as A from "Types/apollo";

type Props = {
  backgroundImage: string,
  currency: string,
  expiryDate: number,
  market: string,
  valuableState: A.PlayerValuableState,
  valuableType: A.ValuableType,
  title: string,
  description: string,
  translations: ValuableThumbnailTranslations,
  caveat: string,
  onClose: () => void,
  isHiddenByDefault: Boolean,
};

// The <ValubleThumbnail> would need the translations in order to display a badge for the expiry date,
// although locked valuables don't have this badge, so we can mock this data now.
// Ideally <ValuableThumbnail> shouldn't make these properties mandatory.
const MOCKED_TRANSLATIONS = { hoursLabel: "", minutesLabel: "" };

export const FreebetNotification = (props: Props) => {
  const { onClose, isHiddenByDefault } = props;
  const [isHidden, setIsHidden] = useState(isHiddenByDefault);

  if (isHidden) {
    return null;
  }

  return (
    <Media
      className="u-padding--md"
      renderImage={() => renderValuableThumbnail(props)}
      renderText={() =>
        renderValuableText({
          ...props,
          onClose: () => {
            onClose();
            setIsHidden(true);
          },
        })
      }
    ></Media>
  );
};

const renderValuableThumbnail = ({
  backgroundImage,
  currency,
  expiryDate,
  market,
  valuableState,
  valuableType,
}) => (
  <div
    className="t-background-white u-padding--sm t-border-r u-overflow-hidden t-box-shadow"
    style={{ width: 56 }}
  >
    <ValuableThumbnail
      backgroundRenderer={
        <ImageLazy
          className="u-object-fit-cover u-width--full u-height--full t-border-r u-overflow-hidden"
          src={backgroundImage}
        />
      }
      currency={currency}
      expiryTimeLeft={getExpiryTimeLeft(expiryDate)}
      market={market}
      translations={MOCKED_TRANSLATIONS}
      valuableState={valuableState}
      valuableType={valuableType}
      size="small"
    />
  </div>
);

const renderValuableText = ({
  title,
  description,
  caveat,
  valuableState,
  valuableType,
  onClose,
}) => (
  <Flex justify="space-between">
    <div className="u-padding-top">
      <Text
        className="u-font-weight-bold u-margin-bottom--sm o-flex o-flex__item-align--center"
        size="sm"
        tag="div"
      >
        {valuableState === VALUABLE_STATES.LOCKED && (
          <LockIcon size="sm" className="u-margin-right--sm" />
        )}
        <DangerousHtml data-test="freebet-notification-title" html={title} />
      </Text>

      {description && (
        <Text size="sm" tag="div">
          <DangerousHtml
            data-test="freebet-notification-description"
            html={description}
          />
        </Text>
      )}

      {caveat && (
        <Text className="t-color-grey-light-1" size="2xs" tag="span">
          <DangerousHtml html={caveat} />
        </Text>
      )}
    </div>

    {onClose && (
      <CrossIcon
        className="u-cursor-pointer o-flex__item--no-shrink"
        onClick={onClose}
      />
    )}
  </Flex>
);
