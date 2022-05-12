import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import { useSelector } from "react-redux";
import { blueRibbonJackpotBySlugSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";
import { BlueRibbonJackpotsStaticWidget } from "./BlueRibbonJackpotsStaticWidget";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";
import { useComposedJackpotConfigBySlug } from "./useComposedJackpot";

export const BlueRibbonJackpotsStaticWidgetContainer = React.memo<any>(
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
      <BlueRibbonJackpotsStaticWidget
        className={className}
        composedPots={composedJackpot.pots}
        widgetColor={composedJackpot.widgetColor}
      />
    );
  }
);
