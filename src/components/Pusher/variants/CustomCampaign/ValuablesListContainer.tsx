import React from "react";
import * as A from "Types/apollo";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import { TLockIcon } from "Components/ValuableThumbnail";
import { VALUABLE_TYPES } from "Models/valuables";
import { ROUTE_IDS } from "Src/constants";
import { useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils/routerUtils";
import { AllValuableType } from "Components/ValuableThumbnail/ValuableSymbol";
import { CustomCampaignValuableList } from "./ValuablesList";

type Props = {
  pusherData: PusherPaylod;
  valuables: A.PlayerValuablesQuery["player"]["valuables"];
  showValuable: (valuable: A.ValuableDetails_PlayerValuableFragment) => void;
  closeModal: () => void;
};

export type ChristmasValuableEntry = {
  __typename: string;
  id: any;
  promoTitle: string;
  subtitle: string;
  valuableType: AllValuableType;
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
}: Props) => {
  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const cashVal = valuables.find(val => val.valuableType === "cash");
  const cashBackVal = valuables.find(val => val.valuableType === "cashback");

  const fullChristmasList: ChristmasValuableEntry[] = [
    cashVal && {
      ...cashVal,
      promoTitle: pusherData.Data.cashback_reward_title,
      subtitle: pusherData.Data.cashback_reward_subtitle,
      lockIcon: "claim" as TLockIcon,
    },
    {
      __typename: REDIRECT_TYPE,
      id: REDIRECT_TYPE,
      promoTitle: pusherData.Data.deposit_lock_title,
      subtitle: pusherData.Data.deposit_lock_subtitle,
      valuableType: VALUABLE_TYPES.CHRISTMAS_SPECIAL,
      coinValue: null,
      lockIcon: "lock" as TLockIcon,
      currency: null,
      rule: {
        name: "",
      },
    },
    cashBackVal && {
      ...cashBackVal,
      promoTitle: cashBackVal.title,
      subtitle: pusherData.Data.cashback_subtitle,
      lockIcon: "lock" as TLockIcon,
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
    />
  );
};
