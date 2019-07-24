//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import MaskImage from "Components/MaskImage";

const WIDTH = 450;
const HEIGHT = 280;

const Path = () => (
  <ellipse cx={WIDTH / 2} cy="0" rx={WIDTH + 300} ry={HEIGHT} fill="#F2F8F8" />
);

type Props = {
  id: string,
  /* Url of the image to be displayed as the background */
  imageUrl: string,
};

export const ValuableDetailsHeaderBackground = ({ id, imageUrl }: Props) => {
  return (
    <Flex.Item>
      <MaskImage
        className="c-valuable-details__header"
        id={`${id}-detail`}
        shapeMask={Path}
        imageUrl={imageUrl}
        width={WIDTH}
        height={HEIGHT}
      />
    </Flex.Item>
  );
};
