//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import MaskImage from "Components/MaskImage";

const ImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);

type Props = {
  /* id of the valuable */
  id: string,
  /* Url of the image to be displayed as the background */
  imageUrl: string,
  /* width of background */
  width: number,
  /* height of background */
  height: number,
};

export const ValuableDetailsHeaderBackground = ({
  id,
  imageUrl,
  ...dimensions
}: Props) => {
  return (
    <Flex.Item>
      <MaskImage
        className="c-valuable-details__header"
        id={`${id}-detail`}
        imageUrl={imageUrl}
        {...dimensions}
      >
        <ImgMask />
      </MaskImage>
    </Flex.Item>
  );
};
