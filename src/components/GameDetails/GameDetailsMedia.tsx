import * as React from "react";
import * as A from "Types/apollo";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  media: A.GameDetailsQuery["game"]["media"];
  name: string;
};

export const GameDetailsMedia = ({ media, name }: Props) => {
  return media.map(gameMedia => {
    if (gameMedia.type !== "image") {
      return null;
    }

    return (
      <ImageLazy
        key={gameMedia.path}
        className="u-display--block u-margin-y u-margin-x--auto"
        src={gameMedia.path}
        alt={name}
        imgixOpts={{ w: 500 }}
      />
    );
  });
};
