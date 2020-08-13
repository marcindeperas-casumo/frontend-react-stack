import React from "react";
import { UserIcon } from "@casumo/cmp-icons";
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

export function LiveCasinoCardFooter({ players, provider }) {
  return (
    <div className="u-margin-x--md o-flex o-flex-justify--space-between o-flex__block t-border-top t-border--current-color t-color-grey-0">
      <div className="o-flex-align--center">
        <UserIcon className="u-margin-y t-color-grey-20" />
        <Text
          size="sm"
          className="u-margin-left--sm u-margin-y u-font-weight-bold t-color-grey-70"
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
