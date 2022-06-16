import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Link } from "@reach/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { blueRibbonJackpotBySlugSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { useTranslations } from "Utils/hooks";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
} from "Src/constants";
import { CloseButton as CloseBtn } from "../../AbstractModal/CloseButton";
import type { ComposedJackpot } from "./blueRibbonConsts";

type JackpotOnboardingWidget = {
  title: string;
  body: string;
  cta: string;
  backgroundImage: string;
  ctaLink: string;
};
export function BlueRibbonJackpotsOnboardingWidget({
  jackpotSlug,
  onClose,
}: {
  jackpotSlug: string;
  onClose: () => void;
}) {
  const composedJackpot: ComposedJackpot = useSelector(
    blueRibbonJackpotBySlugSelector(jackpotSlug)
  );

  const composedPots = composedJackpot?.pots;
  const widgetColor = composedJackpot?.widgetColor;

  const jackpotConfigs = useTranslations<{
    jackpot_onboarding_cta_link: string;
    jackpot_onboarding_background: string;
    jackpot_onboarding_title: string;
    jackpot_onboarding_body: string;
    jackpot_onboarding_button_copy: string;
  }>(`jackpots-configs.${jackpotSlug}`);

  const content: JackpotOnboardingWidget = {
    backgroundImage: jackpotConfigs?.jackpot_onboarding_background,
    title: jackpotConfigs?.jackpot_onboarding_title,
    body: jackpotConfigs?.jackpot_onboarding_body,
    cta: jackpotConfigs?.jackpot_onboarding_button_copy,
    ctaLink: jackpotConfigs?.jackpot_onboarding_cta_link,
  };

  return (
    <Flex
      direction="vertical"
      justify="top"
      className="o-position--relative u-padding--md t-border-r--md u-overflow--hidden u-margin-left flex fj-space-evenly"
      style={{
        backgroundColor: widgetColor?.light,
        backgroundImage: content.backgroundImage
          ? `url('${content.backgroundImage}')`
          : "none",
        width: topListWidgetWidth,
        height:
          composedPots?.length < 3
            ? topListWidgetHeightTwoRows
            : topListWidgetHeight,
      }}
    >
      <Flex direction="horizontal" justify="end">
        <CloseBtn className="u-cursor--pointer" onClick={onClose} />
      </Flex>
      <Text
        size="md"
        className="u-margin-bottom--lg text-white u-font-weight-bold"
      >
        {content.title}
      </Text>
      <Text className="u-margin-bottom--lg text-white">{content.body}</Text>

      <Link
        className="u-font-weight-bold text-grey-90 t-background-white u-text-align-center u-padding--md t-border-r--lg u-margin-bottom--sm"
        to={content.ctaLink ? content.ctaLink : ""}
      >
        {content.cta}
      </Link>
    </Flex>
  );
}
