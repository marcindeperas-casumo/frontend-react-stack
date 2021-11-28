import React from "react";
import * as A from "Types/apollo";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import { TLockIcon } from "Components/ValuableThumbnail";
import {
  VALUABLE_CIRCLE_CLAIM_ICON,
  VALUABLE_CIRCLE_LOCK_ICON,
  VALUABLE_TYPES,
} from "Models/valuables";
import { ROUTE_IDS } from "Src/constants";
import { useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils/routerUtils";
import { AllValuableTypes } from "Components/ValuableThumbnail/ValuableSymbol";
import { CustomCampaignValuableList } from "./ValuablesList";

type Props = {
  pusherData: PusherPaylod;
  valuables: A.PlayerValuablesQuery["player"]["valuables"];
  showValuable: (valuable: A.ValuableDetails_PlayerValuableFragment) => void;
  closeModal: () => void;
  loading?: boolean;
};

export type ChristmasValuableEntry = {
  __typename: string;
  id: any;
  promoTitle: string;
  subtitle: string;
  valuableType: AllValuableTypes;
  currency: any;
  lockIcon: TLockIcon;
  rule: {
    name: string;
  };
};

export const REDIRECT_TYPE = "redirect";

export const CustomCampaignValuableListContainer = ({
  pusherData,
  showValuable,
  closeModal,
  valuables,
  loading = false,
}: Props) => {
  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const cashVal = valuables.find(val => val.valuableType === "cash");
  const cashBackVal = valuables.find(val => val.valuableType === "cashback");

  const fullChristmasList: ChristmasValuableEntry[] = [
    cashVal && {
      ...cashVal,
      promoTitle: pusherData.Data.cashback_reward_title || cashVal.title,
      subtitle: pusherData.Data.cashback_reward_subtitle || cashVal.content,
      lockIcon: VALUABLE_CIRCLE_CLAIM_ICON as TLockIcon,
    },
    {
      __typename: REDIRECT_TYPE,
      id: REDIRECT_TYPE,
      promoTitle: pusherData.Data.deposit_lock_title,
      subtitle: pusherData.Data.deposit_lock_subtitle,
      valuableType: VALUABLE_TYPES.CHRISTMAS_SPECIAL,
      coinValue: null,
      lockIcon: VALUABLE_CIRCLE_LOCK_ICON as TLockIcon,
      currency: null,
      rule: {
        name: "",
      },
    },
    cashBackVal && {
      ...cashBackVal,
      promoTitle: pusherData.Data.cashback_title || cashBackVal.title,
      subtitle: pusherData.Data.cashback_subtitle || cashBackVal.content,
      lockIcon: VALUABLE_CIRCLE_LOCK_ICON as TLockIcon,
    },
  ].filter(v => Boolean(v));

  const onItemClick = (val: Partial<ChristmasValuableEntry>) => {
    if (val.__typename === REDIRECT_TYPE) {
      closeModal();
      return;
    }

    showValuable(val as A.ValuableDetails_PlayerValuableFragment);
  };

  const translatedRoute = `${language}/${translateRoute(
    ROUTE_IDS.PLAYER_DASHBOARD
  )}`;

  return (
    <CustomCampaignValuableList
      redirectRoute={translatedRoute}
      valuables={fullChristmasList}
      onItemClick={onItemClick}
      loading={loading}
    />
  );
};
