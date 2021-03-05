import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
import { addImageSourceToOptions } from "./CuratedCardBackground.utils";

type Props = {
  onClick: Function | undefined;
  link: string | undefined;
  image: string;
};

export const CuratedCardBackgroundNew = ({ image, onClick, link }: Props) => {
  const images = addImageSourceToOptions(image);

  return (
    <a
      className="o-ratio__content u-cursor-pointer"
      href={link}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Function' is not assignable to type '(event:... Remove this comment to see the full error message
      onClick={onClick}
    >
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );
};
