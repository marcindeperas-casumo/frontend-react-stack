import { useQuery } from "@apollo/client";
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import logger from "Services/logger";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslatedUrl, useTranslations } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";
import { useComposedJackpotConfigBySlug } from "./useComposedJackpot";
import { BlueRibbonJackpotsOnboardingWidget } from "./BlueRibbonJackpotsOnboardingWidget";

export function BlueRibbonJackpotsGameLists(props: { jackpot_slug: string }) {
  const { composedJackpot } = useComposedJackpotConfigBySlug({
    slug: props.jackpot_slug,
  });

  const t = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );
  const [onboardingVisible, setOnboardingVisible] = React.useState(true);
  const userViewedJackpotOnboardingOffer = localStorage.getItem(
    "JackpotOnboardingOfferPresented"
  );

  const jackpotConfigs = useTranslations<{
    jackpot_image: string;
    jackpot_onboarding_cta_link: string;
    jackpot_onboarding_background: string;
    jackpot_onboarding_title: string;
    jackpot_onboarding_body: string;
    jackpot_onboarding_button_copy: string;
  }>(`jackpots-configs.${props.jackpot_slug}`);

  useBlueRibbonSDKAnonymous();

  const seeMoreUrl = useTranslatedUrl(ROUTE_IDS.JACKPOTS_DETAILS, {
    slug: props.jackpot_slug,
  });

  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: {
        id: `blueribbon-${props.jackpot_slug}`,
        numberOfGames: 30,
      },
    }
  );

  if (!composedJackpot?.pots) {
    return null;
  }

  const onCloseOnboardingWidget = () => {
    try {
      localStorage.setItem("JackpotOnboardingOfferPresented", "true");
    } catch (error) {
      logger.error("JackpotOnboardingOfferPresented local storage error", {
        error,
      });
    }
    setOnboardingVisible(false);
  };

  return (
    <GameListHorizontalWithWidget
      gamesInColumn={composedJackpot.pots.length > 2 ? 3 : 2}
      name={composedJackpot.title}
      games={R.pathOr([], ["gamesList", "games"], data)}
      seeMore={{
        url: `/${seeMoreUrl}`,
        text: t.more_link,
      }}
      Widget={() => (
        <Flex direction="horizontal">
          <BlueRibbonJackpotsWidget
            composedPots={composedJackpot.pots}
            widgetColor={composedJackpot.widgetColor}
            jackpotLogo={jackpotConfigs.jackpot_image}
            explainerPageUrl={jackpotConfigs.jackpot_onboarding_cta_link}
          />
          {onboardingVisible && !userViewedJackpotOnboardingOffer && (
            <BlueRibbonJackpotsOnboardingWidget
              content={{
                backgroundImage: jackpotConfigs.jackpot_onboarding_background,
                title: jackpotConfigs.jackpot_onboarding_title,
                body: jackpotConfigs.jackpot_onboarding_body,
                cta: jackpotConfigs.jackpot_onboarding_button_copy,
                ctaLink: jackpotConfigs.jackpot_onboarding_cta_link,
              }}
              composedPots={composedJackpot.pots}
              widgetColor={composedJackpot.widgetColor}
              onClose={onCloseOnboardingWidget}
            />
          )}
        </Flex>
      )}
    />
  );
}
