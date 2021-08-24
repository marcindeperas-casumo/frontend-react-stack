import React from "react";
import Flex from "@casumo/cmp-flex";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import {
  topMarginClasses,
  xPaddingClasses,
} from "Components/GameListHorizontal/constants";
import { JackpotRules } from "./JackpotRules";

export type TJackpotDetailsPageTranslations = {
  details_image: string;
  details_title: string;
  details_intro_text: string;
  rules_text: string;
  tncLabel: string;
};

type TProps = {
  optInComponent: React.ReactElement;
  widgetComponent: React.ReactElement;
  isMobile: boolean;
  jackpotSlug: string;
  t: TJackpotDetailsPageTranslations & { tncLabel: string };
};

export const JackpotDetailPage: React.FC<TProps> = ({
  isMobile,
  optInComponent,
  widgetComponent,
  jackpotSlug,
  t,
}: TProps) => {
  return (
    <div
      className={`t-border-r--md@desktop t-border-r--md@tablet o-wrapper t-background-white u-overflow--hidden`}
    >
      <ResponsiveImage
        src={t.details_image}
        dpr={window.devicePixelRatio}
        imgixOpts={{
          fit: "crop",
          w: isMobile ? 700 : 1200,
        }}
      />
      <div
        className={`${topMarginClasses} ${xPaddingClasses} u-padding-bottom--5xlg@mobile u-margin-bottom--md`}
      >
        <Flex
          className={`u-padding-x--xlg@desktop`}
          direction={isMobile ? "vertical" : "horizontal"}
          spacing="xlg"
          align={isMobile ? "center" : "start"}
          justify="space-between"
        >
          <Flex.Item>
            <h2>{t.details_title}</h2>
            <div className={`${topMarginClasses}`}>{t.details_intro_text}</div>
            <div className={`${topMarginClasses}`}>
              <JackpotRules
                jackpotSlug={jackpotSlug}
                text={t.rules_text}
                tncLabel={t.tncLabel}
              />
            </div>
          </Flex.Item>
          <Flex.Item>{widgetComponent}</Flex.Item>
        </Flex>
        <div
          className={`u-width--full u-padding-x--xlg@desktop ${topMarginClasses} u-padding-bottom--md@desktop u-padding-bottom--md@tablet`}
        >
          {optInComponent}
        </div>
      </div>
    </div>
  );
};
