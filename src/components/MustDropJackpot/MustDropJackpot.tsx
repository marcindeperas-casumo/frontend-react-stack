import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import React from "react";
import * as A from "Types/apollo";
import { GameRow } from "Components/GameRow";

type Props = {
  jackpot: A.MustDropJackpotsQuery["mustDropJackpots"][number];
};

export const MustDropJackpot = ({ jackpot }: Props) => {
  const { image, label, amount } = jackpot;
  const { formattedAmount } = amount;

  return (
    <Media
      className="u-padding--md"
      renderImage={() => (
        <img
          className="u-display--block"
          width={GameRow.ICON_SIZE}
          height={GameRow.ICON_SIZE}
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
