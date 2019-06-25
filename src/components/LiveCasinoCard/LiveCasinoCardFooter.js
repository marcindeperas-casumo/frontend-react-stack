import React from "react";
import { PlayerIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import Matcher from "../Matcher";
import Casumo from "./providers/casumo.svg";
import Evolution from "./providers/evolution.svg";

const Provider = props => (
  <Matcher
    getKey={({ condition }) => condition}
    matchers={{
      casumo: Casumo,
      evolution: Evolution,
      default: Evolution,
    }}
    {...props}
  />
);

export default function LiveCasinoCardFooter({ players, provider }) {
  return (
    <div className="o-flex o-flex-justify--space-between o-flex__block t-border-top t-border--current-color t-color-grey-light-2">
      <div className="o-flex-align--center">
        <PlayerIcon className="u-margin-y t-color-grey" size="sm" />
        <Text
          size="sm"
          className="u-margin-left--sm u-margin-y u-font-weight-bold t-color-grey-dark-2"
        >
          {players}
        </Text>
      </div>
      <div className="o-flex-align--center">
        <Provider condition={provider} />
      </div>
    </div>
  );
}
