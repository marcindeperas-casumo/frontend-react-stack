// @flow
import React from "react";
import { UserIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import Matcher from "../Matcher";
import Casumo from "./providers/casumo.svg";
import Evolution from "./providers/evolution.svg";
import Netent from "./providers/netent.svg";
import Pragmatic from "./providers/pragmatic.svg";
import Ezugi from "./providers/ezugi.svg";

const Provider = props => (
  <Matcher
    getKey={({ condition }) => condition}
    matchers={{
      casumo: Casumo,
      evolution: Evolution,
      Evolution: Evolution,
      Ezugi: Ezugi,
      "Net Entertainment": Netent,
      "Pragmatic Play": Pragmatic,
      default: () => <Text>{props.condition}</Text>,
    }}
    {...props}
  />
);

type Props = {
  players?: number,
  provider: string,
};
export function LiveCasinoCardFooter({ players, provider }: Props) {
  return (
    <div className="u-margin-x--md o-flex o-flex-justify--space-between o-flex__block t-border-top t-border-current t-color-grey-0">
      {players ? (
        <div className="o-flex-align--center">
          <UserIcon className="u-margin-y t-color-grey-20" />
          <Text
            size="sm"
            className="u-margin-left--sm u-margin-y u-font-weight-bold t-color-grey-70"
          >
            {players}
          </Text>
          )}
        </div>
      ) : (
        <div className="u-padding--md u-margin--sm" />
      )}
      <div className="o-flex-align--center">
        <Provider condition={provider} />
      </div>
    </div>
  );
}
