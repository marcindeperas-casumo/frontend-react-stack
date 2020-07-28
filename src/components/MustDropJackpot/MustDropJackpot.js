// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import * as A from "Types/apollo";

type Props = {
  jackpot: A.MustDropJackpot_MustDropJackpot,
};

const MustDropJackpot = ({ jackpot }: Props) => {
  const { image, label, amount = {} } = jackpot;
  const { formattedAmount } = amount;
  return (
    <Media
      className="o-flex--1 u-padding-x--lg u-padding-y--md t-background-grey-90"
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
          <Text className="u-margin-bottom--sm u-font-weight-bold t-color-yellow-30">
            {formattedAmount}
          </Text>
          <Text size="xs" className="u-margin-bottom--none t-color-grey-20">
            {label}
          </Text>
        </>
      )}
    />
  );
};

export default MustDropJackpot;
