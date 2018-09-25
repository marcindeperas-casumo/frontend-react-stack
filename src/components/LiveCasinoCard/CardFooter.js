import React from "react";
import { PlayerIcon } from "@casumo/cmp-icons";

import Matcher from "../Matcher";
// import CasumoLogo from "./providerLogos/Casumo";
import Casumo from "./providers/casumo.svg";
import Evolution from "./providers/evolution.svg";

const Provider = props => (
  <Matcher
    getKey={({ condition }) => condition}
    matchers={{
      casumo: Casumo,
      evolution: Evolution,
    }}
    {...props}
  />
);

export default function CardFooter({ players, provider }) {
  return (
    <div className="o-flex o-flex-justify--space-between o-flex__block">
      <div className="o-flex-align--center">
        <PlayerIcon className="u-margin-vert t-color-grey" size="sml" />
        <span className="u-margin-left--micro u-margin-vert u-font-weight-bold t-color-grey-dark-2">
          {players}
        </span>
      </div>
      <div className="o-flex-align--center">
        <Provider condition={provider} />
      </div>
    </div>
  );
}
