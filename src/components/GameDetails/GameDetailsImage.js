// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
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
export const GameDetailsImageDesktop = ({
  image,
  mark,
  className,
  children,
}: Props) => (
  <Flex className="u-position-relative t-border-r--md u-overflow-hidden u-width--1/3">
    <ImageLazy
      className={className}
      src={image}
      mark={mark}
      imgixOpts={{
        fit: "crop",
        markscale: 55,
        markalign: "middle,center",
        w: "481",
      }}
    />
    {children}
  </Flex>
);
