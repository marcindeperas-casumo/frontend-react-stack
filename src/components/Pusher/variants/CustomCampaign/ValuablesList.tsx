import React from "react";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import { TLockIcon, ValuableCoin } from "Components/ValuableThumbnail";
import DangerousHtml from "Components/DangerousHtml";
import "./ValuablesList.scss";
import { VALUABLE_TYPES } from "Models/valuables";
import { ROUTE_IDS } from "Src/constants";
import { useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils/routerUtils";
import { NavLink } from "Components/NavLink";
import { AllValuableType } from "Components/ValuableThumbnail/ValuableSymbol";

type Props = {
  pusherData: PusherPaylod;
  valuables: A.PlayerValuablesQuery["player"]["valuables"];
  showValuable: (valuable: A.ValuableDetails_PlayerValuableFragment) => void;
  closeModal: () => void;
};

type ChristmasValuableEntry = {
  __typename: string;
  id: any;
  promoTitle: string;
  subtitle: string;
  valuableType: AllValuableType;
  coinValue: any;
  currency: any;
  lockIcon: TLockIcon;
};

const REDIRECT_TYPE = "redirect";

export const CustomCampaignValuableList = ({
  pusherData,
  showValuable,
  closeModal,
  valuables,
}: Props) => {
  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const cashVal = valuables.find(val => val.valuableType === "cash");
  const cashBackVal = valuables.find(val => val.valuableType === "cashback");

  const fullChristmasList: Partial<ChristmasValuableEntry>[] = [
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
    },
    cashBackVal && {
      ...cashBackVal,
      promoTitle: cashBackVal.title,
      subtitle: pusherData.Data.cashback_subtitle,
      lockIcon: "lock" as TLockIcon,
    },
  ]
  .filter(v => Boolean(v));

  const onItemClick = (val: Partial<ChristmasValuableEntry>) => {
    if (val.__typename === REDIRECT_TYPE) {
      closeModal();
      return;
    }

    showValuable(val as A.ValuableDetails_PlayerValuableFragment);
  };

  const translatedRoute = `${language}/${translateRoute(ROUTE_IDS.PLAYER_DASHBOARD)}`;

  const withPlayerProfileLink = (val, element) => {
    if (val.__typename === REDIRECT_TYPE) {
      return <NavLink to={translatedRoute}>
        {element}
      </NavLink>
    }

    return <>{element}</>;
  };

  return (
    <>
      {fullChristmasList.map(val => (
        <Flex.Item key={val.id}>
          <Flex
            className="u-cursor--pointer u-padding-x--md u-padding-y--sm t-border-bottom border-grey-5"
            onClick={() => onItemClick(val)}
            align="center"
          >
            <Flex.Item>
              {withPlayerProfileLink(
                val,
                <ValuableCoin
                  coinValue={
                    val.__typename === "PlayerValuableSpins"
                      ? val.coinValue
                      : null
                  }
                  currency={val.currency}
                  size="large"
                  valuableType={val.valuableType}
                  className="valuable-list__coin"
                  lockIcon={val.lockIcon}
                />
              )}
            </Flex.Item>
            <Flex.Item className="u-text-align-left u-padding-left--sm">
              {withPlayerProfileLink(
                val,
                <>
                  <span className="t-color-purple-60 u-font-weight-bold">
                    {val.promoTitle || "Game of the day"}
                  </span>
                  <div className="text-grey-50">
                    <DangerousHtml html={val.subtitle} />
                  </div>
                </>
              )}
            </Flex.Item>
          </Flex>
        </Flex.Item>
      ))}
    </>
  );
};
