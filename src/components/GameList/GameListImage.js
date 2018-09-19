import React from "react";
import LazyImage from "../LazyImage";

export default function GameListImage({ src }) {
  return <LazyImage style={{ width: "100%" }} src={src} dpr={3} />;
}
