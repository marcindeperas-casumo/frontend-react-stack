import { UserIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import React from "react";
import { is } from "ramda";
import type { TLiveCasinoCardContent } from "./LiveCasinoCardContainer";

type Props = {
  players?: number;
  provider: string;
  providerLogos: TLiveCasinoCardContent["provider_logos"];
};
export function LiveCasinoCardFooter({
  players,
  provider,
  providerLogos = [],
}: Props) {
  const logoUrl = providerLogos.find(
    ({ provider_name }) => provider_name === provider
  )?.logo;

  return (
    <div className="u-margin-x--md o-flex o-flex-justify--space-between o-flex__block t-border-top border-current text-grey-0">
      {is(Number, players) ? (
        <div className="o-flex-align--center">
          <UserIcon className="u-margin-y text-grey-20" />
          <Text
            size="sm"
            className="u-margin-left--sm u-margin-y u-font-weight-bold text-grey-70"
          >
            {players}
          </Text>
        </div>
      ) : (
        <div className="u-padding--md u-margin--sm" />
      )}
      <div className="o-flex-align--center">
        {logoUrl ? <img src={logoUrl} /> : provider}
      </div>
    </div>
  );
}
