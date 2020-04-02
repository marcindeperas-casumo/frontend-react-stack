// @flow
import * as React from "react";
import classNames from "classnames";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  image: string,
  mark: string,
  className?: string,
  children?: React.Node,
};

export const GameDetailsImage = ({
  image,
  mark,
  className,
  children,
}: Props) => (
  <div className="o-ratio o-ratio--game-detail-image">
    <ImageLazy
      className={classNames(
        ["o-ratio__content", "u-object-fit-cover"],
        className
      )}
      src={image}
      mark={mark}
      imgixOpts={{
        ar: "375:164",
        fit: "crop",
        markscale: 55,
        markalign: "middle,center",
        w: "500",
      }}
    />
    {children}
  </div>
);
