import React from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { LazyCasinoGamesRTPLight } from "Components/CasinoGames";
import { LazyFooterTermsAndConditionsForBonuses } from "Components/Router/routes/LazyFooterTermsAndConditionsForBonuses";
import { PusherModal } from "Components/Pusher";
import { LazyPlayerPlayOkaySettings } from "Components/Router/routes";

export const AppLiS = ({ sessionId, playerId }) => {
  return (
    <React.StrictMode>
      <Router></Router>
      <LazyPortal
        hostElementId="react-account-verification-navigation-item"
        loader={() =>
          import(
            "Components/AccountVerification/AccountVerificationNavigationItemContainer"
          )
        }
        namedExport="AccountVerificationNavigationItemContainer"
      />
      <LazyPortal
        hostElementId="react-host-deposit-limits"
        loader={() =>
          import("Components/Compliance/DGOJ/DepositLimits/DepositLimitsView")
        }
        namedExport="DepositLimitsViewContainer"
      />
      <PusherModal sessionId={sessionId} playerId={playerId} />
      <LazyCasinoGamesRTPLight />
      <LazyFooterTermsAndConditionsForBonuses />
      <LazyPlayerPlayOkaySettings />
    </React.StrictMode>
  );
};
