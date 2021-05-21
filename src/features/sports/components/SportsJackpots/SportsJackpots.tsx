import * as React from "react";
import "./SportsJackpots.scss";
import { useTranslations } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { isTestEnv } from "Utils";
import { isMobile, isTablet } from "Components/ResponsiveLayout";

const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
const CMS_SLUG_JACKPOTS = "sports-jackpots";

export const SportsJackpots = () => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);

  if (
    !t ||
    (t && isTestEnv() && t.enable_for_test === false) ||
    (t && !isTestEnv() && t.enable_for_prod === false)
  ) {
    return null;
  }

  const backgroundImage = () => {
    if (isMobile()) {
      return t.background_mobile.url;
    }
    if (isTablet()) {
      return t.background_tablet.url;
    }
    return t.background_desktop.url;
  };

  return (
    <div
      className="c-sports-jackpots bg-center bg-gradient-to-b"
      style={{ backgroundImage: `url('${backgroundImage()}'` }}
    >
      aaaa
    </div>
  );
};
