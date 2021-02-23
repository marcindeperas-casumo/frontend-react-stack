// @flow
import * as React from "react";
import * as A from "Types/apollo";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  media: Array<A.GameDetailsQuery_game_media>,
  name: string,
};

export const GameDetailsMedia = ({ media, name }: Props) => {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  return media.map<React.Node>(gameMedia => {
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
