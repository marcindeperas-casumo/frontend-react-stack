import React from "react";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import { ValuableCoin } from "Components/ValuableThumbnail";
import DangerousHtml from "Components/DangerousHtml";
import "./ValuablesList.scss";
import { VALUABLE_TYPES } from "Models/valuables";

type Props = {
  pusherData: PusherPaylod;
  valuables: A.PlayerValuablesQuery["player"]["valuables"];
  showValuable: (valuable: A.ValuableDetails_PlayerValuableFragment) => void;
};

const REDIRECT_TYPE = "redirect";

export const CustomCampaignValuableList = ({
  pusherData,
  showValuable,
  valuables,
}: Props) => {
  const cashVal = valuables.find(val => val.valuableType === "cash");
  const cashBackVal = valuables.find(val => val.valuableType === "cashback");

  const fullChristmasList = [
    cashVal && {
      ...cashVal,
      title: pusherData.Data.cashback_reward_title,
      subtitle: pusherData.Data.cashback_reward_subtitle,
    },
    {
      __typename: REDIRECT_TYPE,
      id: REDIRECT_TYPE,
      title: pusherData.Data.deposit_lock_title,
      subtitle: pusherData.Data.deposit_lock_subtitle,
      valuableType: VALUABLE_TYPES.CHRISTMAS_SPECIAL,
      coinValue: null,
      currency: null,
    },
    cashBackVal && {
      ...cashBackVal,
      title: pusherData.Data.cashback_title,
      subtitle: pusherData.Data.cashback_subtitle,
    },
  ].filter(v => Boolean(v));

  return (
    <>
      {fullChristmasList.map(val => (
        <Flex.Item key={val.id}>
          <Flex
            className={"u-cursor--pointer u-padding-x--md"}
            onClick={() => showValuable(val)}
            align="center"
          >
            <Flex.Item>
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
              />
            </Flex.Item>
            <Flex.Item className="u-text-align-left u-padding-left--md">
              <span className="t-color-purple-60 u-font-weight-bold">
                {val.title || "Game of the day"}
              </span>
              <div className="text-grey-50">
                <DangerousHtml html={val.subtitle} />
              </div>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      ))}
    </>
  );
};
