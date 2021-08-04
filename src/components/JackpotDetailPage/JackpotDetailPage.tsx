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
};

type TProps = {
  optInComponent: React.ReactElement;
  widgetComponent: React.ReactElement;
  isMobile: boolean;
  t: TJackpotDetailsPageTranslations;
};

export const JackpotDetailPage: React.FC<TProps> = ({
  isMobile,
  optInComponent,
  widgetComponent,
  t,
}: TProps) => {
  return (
    <div
      className={`t-border-r--md@desktop t-border-r--md@tablet o-wrapper t-background-white u-overflow--hidden`}
    >
      <ResponsiveImage
        src={t.details_image}
        dpr={2}
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
              <JackpotRules text={t.rules_text} />
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
