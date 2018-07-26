/* @flow */
import React from "react";
import classNames from "classnames";

import "./Card.scss";

import Heading from "@casumo/cmp-heading";
import Button from "@casumo/cmp-button";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { AvatarHeadIcon } from "@casumo/cmp-icons";

type Props = {
  // Additional css classes
  className?: string,
  // Card responsive image or lazy image component
  image: React.Node,
  // children cmp overlay data
  cardData?: React.Node,
  // Card heading title
  title: string,
  // Card bet range data
  betLimits?: {
    symbol: string,
    min: number,
    max: number,
  },
  // Card players in the game
  players?: number,
  // Game or table Provider logo
  providerLogoSrc?: string,
  // Call to Action button
  cta?: {
    text: string,
    onClick: string => void,
  },
};

const Card = ({
  className,
  image,
  cardData,
  title,
  betLimits,
  players,
  providerLogoSrc,
  cta,
}: Props) => {
  const componentClasses = classNames("c-card", className);

  return (
    <div className={componentClasses}>
      <div className="c-card__top">
        <div className="c-card__img">{image}</div>
        {cardData}
      </div>

      <div className="c-card__body u-padding-top--small u-padding-bottom--normal">
        <div className="c-card__info">
          <Heading
            className="c-card__title u-font-weight--bold"
            text={title}
            size="uno"
          />

          {betLimits && (
            <div className="u-font--uno u-margin-top">
              {betLimits.symbol}
              {betLimits.min} – {betLimits.symbol}
              {betLimits.max}
            </div>
          )}
        </div>

        {cta && (
          <div>
            <Button onClick={cta.onClick}>{cta.text}</Button>
          </div>
        )}
      </div>

      <div className="c-card__footer">
        {players && (
          <div className="c-card__players u-margin-vert">
            <AvatarHeadIcon size="sml" />
            <span className="c-card__players-number u-font-weight--bold">
              {players}
            </span>
          </div>
        )}
        <div className="c-card__provider u-margin-top">
          {providerLogoSrc && (
            <ResponsiveImage
              className="c-card__provider-img"
              src={providerLogoSrc}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
