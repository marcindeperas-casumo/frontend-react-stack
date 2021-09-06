import React from "react";

type TProps = {
  url: string;
  type: "thumb" | "tile";
};

const THUMB_SIZE = "25px";
const TILE_SIZE = "25px";

const styles = {
  thumb: { width: THUMB_SIZE, top: "-10px", left: "-10px" },
  tile: { width: TILE_SIZE, top: "10px", left: "10px" },
};

export const JackpotMarkImage = ({ url, type }: TProps) => {
  return (
    <div style={styles[type]} className="o-position--absolute">
      <img src={url} />
    </div>
  );
};
