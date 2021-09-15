import React from "react";
import { useSelector } from "react-redux";
import { gameJackpotSlugSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { useTranslations } from "Utils/hooks";
import { JackpotMarkImage } from "./JackpotMarkImage";

type TProps = {
  gameSlug: string;
  type: "thumb" | "tile";
};

export const JackpotMarkImageContainer = ({ gameSlug, type }: TProps) => {
  const eligibleJackpotSlug = useSelector(gameJackpotSlugSelector(gameSlug));

  const jackpotConfig = useTranslations<{
    jackpot_image: string;
  }>(eligibleJackpotSlug && `jackpots-configs.${eligibleJackpotSlug}`);

  return jackpotConfig?.jackpot_image ? (
    <JackpotMarkImage type={type} url={jackpotConfig.jackpot_image} />
  ) : null;
};
