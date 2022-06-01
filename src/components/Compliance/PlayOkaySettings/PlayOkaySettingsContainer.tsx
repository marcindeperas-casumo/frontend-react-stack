import * as React from "react";
import { useGetPlayerConfigQuery } from "Models/playOkay";
import { LimitsCardContainer } from "../GenericLimits/LimitsCard";
import { PlayOkaySettings } from "./PlayOkaySettings";

export function PlayOkaySettingsContainer() {
  const { data: playOkayConfig, isError } = useGetPlayerConfigQuery();

  return (
    <PlayOkaySettings isError={isError}>
      {playOkayConfig?.limits.map(limitConfig => (
        <LimitsCardContainer
          key={limitConfig.group}
          group={limitConfig.group}
        />
      ))}
    </PlayOkaySettings>
  );
}
