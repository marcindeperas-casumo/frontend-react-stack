// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Media from "Components/Media";

type Props = {
  jackpot: Object,
};

const MustDropJackpot = ({ jackpot }: Props) => {
  const { image, label, amount = {} } = jackpot;
  const { formattedAmount } = amount;
  return (
    <Media
      className="u-padding--lg t-background-grey-dark-3"
      renderImage={() => (
        <img
          className="u-display--block"
          width={48}
          height={48}
          alt=""
          src={image}
        />
      )}
      renderText={() => (
        <>
          <Text className="u-margin-bottom--sm u-font-weight-bold t-color-yellow">
            {formattedAmount}
          </Text>
          <Text className="u-margin-bottom--none t-color-grey">{label}</Text>
        </>
      )}
    />
  );
};

export default MustDropJackpot;
