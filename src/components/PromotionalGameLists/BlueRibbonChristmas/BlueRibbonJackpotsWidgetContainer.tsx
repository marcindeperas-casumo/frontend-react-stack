import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import {
  useComposedJackpotConfigData,
  useBlueRibbonSDKAnonymous,
} from "./useBlueRibbonSDK";

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
    const { composedJackpot } = useComposedJackpotConfigData({
      jackpotSlug: jackpot_slug,
    });
    useBlueRibbonSDKAnonymous();

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
        composedPots={composedJackpot.pots}
        widgetColor={composedJackpot.widgetColor}
      />
    );
  }
);
