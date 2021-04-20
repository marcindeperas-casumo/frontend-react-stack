import React from "react";
import { Article } from "Src/types/apollo";

const IMG_SIZE = 64;

type TProps = Article;

export const ArticleThumbnail = ({ thumbnail, title }: TProps) => {
  return (
    <img
      className="t-background-grey-20 t-border-r u-overflow--hidden"
      src={thumbnail}
      alt={title}
      style={{ height: IMG_SIZE, width: IMG_SIZE }}
    />
  );
};
