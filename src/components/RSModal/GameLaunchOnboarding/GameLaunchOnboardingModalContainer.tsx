import React from "react";
import { useTranslations } from "Utils/hooks";
import { GameLaunchOnboardingModal } from "./GameLaunchOnboardingModal";

type TProps = {
  slug: string;
  acceptJackpot: () => void;
  denyJackpot: () => void;
};
export const GameLaunchModal = ({
  slug,
  acceptJackpot,
  denyJackpot,
}: TProps) => {
  const t = useTranslations(`jackpot-details-pages.${slug}`);
  console.log("T ", t);
  console.log("Jackpot Slug ", slug);

  const cmsContent = {
    content: {
      details_image:
        "https://cms.casumo.com/wp-content/uploads/2020/12/ggl-pause-break.svg",
      onboarding_title: "Ready to try Casumo Jackpots?",
      onboarding_text:
        "You’re about to play a Casumo Jackpots game. Select ‘Play with jackpots’ for a chance to win 1 of 4 progressive jackpots that can drop on any spin. The next jackpot could be yours!",
      rules_text:
        "By opting-in you agree to contribute 10 cents per round to the total prize pool. T&C apply",
      button_accept: "Play with jackpots",
      button_deny: "Play normally",
    },
  };

  return (
    (t || cmsContent) && (
      <GameLaunchOnboardingModal
        acceptModal={acceptJackpot}
        cancelModal={denyJackpot}
        config={t || cmsContent}
      />
    )
  );
};
