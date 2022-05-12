import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "Utils/hooks";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";
import { blueRibbonJackpotBySlugSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";
import { normalizePots } from "./utils";
import { useComposedJackpotConfigBySlug } from "./useComposedJackpot";

export const BlueRibbonJackpotsWidgetPromotionPage = (props: {
  jackpot_slug: string;
}) => (
  <div className="u-margin-x--md u-margin-bottom--lg">
    <BlueRibbonJackpotsWidgetContainer className="u-width--full" {...props} />
  </div>
);

export const BlueRibbonJackpotsWidgetContainer = React.memo<any>(
  ({
    className = "",
    jackpot_slug,
  }: {
    className?: string;
    jackpot_slug: string;
  }) => {
    useBlueRibbonSDKAnonymous();
    useComposedJackpotConfigBySlug({ slug: jackpot_slug });
    const composedJackpot = useSelector(
      blueRibbonJackpotBySlugSelector(jackpot_slug)
    );

    const jackpotConfigs = useTranslations<{
      jackpot_image: string;
      jackpot_onboarding_cta_link: string;
    }>(`jackpots-configs.${jackpot_slug}`);

    if (!composedJackpot?.pots) {
      return (
        <Skeleton
          colorHi="#d3d8e1"
          colorLow="#e5eaed"
          viewBox={null}
          width={topListWidgetWidth}
          height={topListWidgetHeight}
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </Skeleton>
      );
    }

    return (
      <BlueRibbonJackpotsWidget
        className={className}
        composedPots={normalizePots(composedJackpot?.pots)}
        widgetColor={composedJackpot?.widgetColor}
        jackpotLogo={jackpotConfigs?.jackpot_image}
        explainerPageUrl={jackpotConfigs?.jackpot_onboarding_cta_link}
      />
    );
  }
);
