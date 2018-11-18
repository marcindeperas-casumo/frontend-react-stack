// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Media from "Components/Media";

type Props = {
  amount: string,
  description: string,
  imageSrc: string,
};

const MustDropJackpot = ({ imageSrc, amount, description }: Props) => (
  <Media
    className="u-padding--lg t-background-grey-dark-3"
    renderImage={() => (
      <img
        className="u-display--block"
        width={48}
        height={48}
        alt=""
        src={imageSrc}
      />
    )}
    renderText={() => (
      <>
        <Text className="u-margin-bottom--sm u-font-weight-bold t-color-yellow">
          {amount}
        </Text>
        <Text className="u-margin-bottom--none t-color-grey">
          {description}
        </Text>
      </>
    )}
  />
);

export default MustDropJackpot;
