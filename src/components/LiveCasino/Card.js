/* @flow */
import React from "react";
import classNames from "classnames";

import "./Card.scss";

import Heading from "@casumo/cmp-heading";
import Button from "@casumo/cmp-button";
import { AvatarHeadIcon } from "@casumo/cmp-icons";

type Props = {
  // Additional css classes
  className?: string,
  // children cmp overlay
  overlayData?: React.Node,
  // Card image source
  imgSrc: string,
  // Card heading title
  title: string,
  // Card bet range data
  betLimits?: {
    symbol: string,
    min: number,
    max: number, // Bets range
  },
  // Card players in the game
  players?: number,
  // Game or table Provider log
  providerLogoSrc?: string,
  // Closed table or disabled
  disabled?: boolean,
};

const Card = ({
  className,
  overlayData,
  imgSrc,
  title,
  betLimits,
  players,
  providerLogoSrc,
  disabled,
  ...props
}: Props) => {
  const componentClasses = classNames("c-card", className);
  const styleImg = { backgroundImage: `url("${imgSrc}")` };

  return (
    <div className={componentClasses} {...props}>
      <div className="c-card__img" style={styleImg}>
        {overlayData}
      </div>

      <div className="c-card__body u-padding-vert--normal">
        <div className="c-card__info">
          <Heading
            className="c-card__title u-font-weight--bold"
            text={title}
            size="kilo"
          />

          {betLimits && (
            <div className="u-font--uno u-margin-vert">
              {betLimits.symbol}
              {betLimits.min} – {betLimits.symbol}
              {betLimits.max}
            </div>
          )}
        </div>

        <Button className="u-font-weight--normal" size="small">
          Play Now
        </Button>
      </div>

      <div className="c-card__footer">
        <div className="c-card__players u-margin-vert">
          <span className="c-card__players-number u-font--uno u-font-weight--bold">
            {players}
          </span>
          <AvatarHeadIcon size="sml" />
        </div>
      </div>
    </div>
  );
};

export default Card;
