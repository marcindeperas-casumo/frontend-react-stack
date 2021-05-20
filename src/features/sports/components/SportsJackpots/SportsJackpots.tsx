import * as React from "react";
import "./SportsJackpots.scss";

const data = {
  background_desktop:
    "https://cms.casumo.com/wp-content/uploads/2021/05/Desktop.png",
};

export const SportsJackpots = () => {
  return (
    <div
      className="c-sports-jackpots"
      style={{ backgroundImage: `url('${data.background_desktop}'` }}
    >
      aaaa
    </div>
  );
};
