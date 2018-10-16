import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

export default function GameListImage({ src }) {
  return <ImageLazy style={{ width: "100%" }} src={src} dpr={3} />;
}
