import React from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { LazyPlayerPlayOkaySettings } from "Components/Router/routes/LazyPlayerPlayOkaySettings";
import { LazyCasinoGamesRTPLight } from "Components/CasinoGames";
import { LazyFooterTermsAndConditionsForBonuses } from "Components/Router/routes/LazyFooterTermsAndConditionsForBonuses";
import { PusherModal } from "Components/Pusher";

export const AppLiS = ({ sessionId, playerId }) => {
  return (
    <React.StrictMode>
      <Router></Router>
      <LazyPortal
        hostElementId="react-host-deposit-limits"
        loader={() =>
          import("Components/Compliance/DepositLimits/DepositLimitsView")
        }
        namedExport="DepositLimitsViewContainer"
      />
      <PusherModal
        sessionId={sessionId}
        playerId={playerId}
      />
      <LazyPlayerPlayOkaySettings />
      <LazyCasinoGamesRTPLight />
      <LazyFooterTermsAndConditionsForBonuses />
    </React.StrictMode>
  );
};
