import React from "react";
import { useLocation } from "@reach/router";
import { useLocalStorage } from "react-use";
import { getUrlSearchParam } from "Utils";
import { PromotionPage } from "./PromotionPage";

export const verticalCampaigns = [
  { origin: "casino", slug: "campaigns.winter-games" },
  { origin: "sports", slug: "campaigns.countdown-to-2020" },
];

export const PromotionPageContainer = () => {
  const { search } = useLocation();
  const [verticalOriginInStorage] = useLocalStorage("promotionsVerticalOrigin");
  const verticalOriginParam = getUrlSearchParam(search, "origin");
  const verticalOrigin = verticalOriginParam || verticalOriginInStorage;

  const sortedPromotionLists =
    verticalOrigin === "sports"
      ? // eslint-disable-next-line fp/no-mutating-methods
        verticalCampaigns.slice().reverse()
      : verticalCampaigns;

  return <PromotionPage promotionLists={sortedPromotionLists} />;
};
