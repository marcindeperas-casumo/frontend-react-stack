import React from "react";
import JackpotCasumoImg from "./assets/jackpot-logo.svg";
import "./JackpotLogo.scss";

export const AnimatedJackpotLogo = () => {
  return (
    <div className="c-jackpot-logo o-position--absolute c-jackpot-logo-slide-in">
      <JackpotCasumoImg />
    </div>
  );
};
