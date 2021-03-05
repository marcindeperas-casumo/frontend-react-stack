import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  src: string;
  mark: string;
  height?: number;
  width?: number;
  alt?: string | void;
};

export const GameThumb = ({
  src,
  mark,
  width = 56,
  height = 56,
  alt = null,
}: Props) => {
  if (!src) {
    return null;
  }

  return (
    <ImageLazy
      className="u-display--block t-border-r--md"
      width={width}
      height={height}
      src={src}
      mark={mark}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | void' is not assignable to type 'st... Remove this comment to see the full error message
      alt={alt}
      imgixOpts={{
        w: width,
        h: height,
        fit: "crop",
        crop: "top,left",
        markscale: 100,
      }}
    />
  );
};
