import React from "react";
import JackpotCasumoImg from "./assets/jackpot-logo.svg";
import "./JackpotLogo.scss";

export const JackpotLogo = () => {
  return (
    <div className="c-jackpot-logo u-position-absolute c-jackpot-logo-slide-in">
      <JackpotCasumoImg />
    </div>
  );
};
