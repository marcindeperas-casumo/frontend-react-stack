import React from "react";
import LazyImage from "../LazyImage";

export default function GameListImage({ src }) {
  return (
    <LazyImage
      className="c-card__img-pic"
      style={{ width: "100%" }}
      src={src}
      dpr={3}
    />
  );
}
