import * as React from "react";
import "./SportsYouWon.scss";
import { CloseIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import { useLocale, useTranslations } from "Utils/hooks";
import { BET_DATA } from "./__mocks__/mock";
import type { SportsYouWonTranslations } from "./SportsYouWon.types";

type Props = {
  currentHash: string;
};

const PROP_NAME = "?youwon=";
const CMS_SLUG = "sports.sports-you-won-modal";

const showModal = (currentHash: string) => {
  return currentHash.indexOf(PROP_NAME) > -1;
};

const getBetId = (currentHash: string) => {
  return currentHash.substr(currentHash.indexOf(PROP_NAME) + PROP_NAME.length);
};

const getBetData = (betId: string) => {
  return BET_DATA;
};

export const legsDisplay = (data: any, t: SportsYouWonTranslations) => {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (data.legs.length) {
    case 1:
      return t.single;
    case 2:
      return t.double;
    case 3:
      return t.tripple;
    case 4:
      return t.four;
    default:
      return t.multi;
  }
};

const removeYouWonParam = currentHash => {
  // eslint-disable-next-line fp/no-mutation
  window.location.hash = window.location.hash.substr(
    0,
    currentHash.indexOf(PROP_NAME)
  );
};

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const SportsYouWonComponent = ({ currentHash }: Props) => {
  const t = useTranslations<SportsYouWonTranslations>(CMS_SLUG);
  const locale = useLocale();

  if (!showModal(currentHash) || !t) {
    return null;
  }

  const betData = getBetData(getBetId(currentHash));

  const wonAmount = formatCurrency({
    locale,
    currency: betData.currency,
    value: betData.payout,
  });

  const content = t.text
    .replace("{$username}", betData.username)
    .replace("{$wonAmount}", wonAmount);

  return (
    <div
      className="c-sports-youwon
                bg-grey-70
                bg-opacity-75
                fixed
                w-screen
                h-screen,
                top-0
                bottom-0
                left-0
                right-0
                z-20
                flex
                items-center
                justify-center"
    >
      <div
        className="c-sports-youwon-content
                    t-border-r--md
                    t-border-r--none@mobile
                    h-3/4
                    sm:h-screen
                    sm:w-screen
                    bg-purple-50
                    bg-opacity-100
                    color-white
                    relative
                    bg-right-top
                    bg-no-repeat"
        style={{
          backgroundImage: `url('${t["background-image"]}'`,
        }}
      >
        <div
          className="h-full relative top-0 left-0 bottom-0 right-0 bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url('${t[`animation${getRndInteger(1, 2)}`]}'`,
          }}
        >
          <CloseIcon
            onClick={() => removeYouWonParam(currentHash)}
            className="cursor-pointer absolute top-0 right-0 u-margin-top--md u-margin-right--md"
          />
          <div className="u-padding-x--2xlg u-padding-top--4xlg u-padding-bottom--lg flex flex-col items-start space-y-4 h-full">
            <img src={t["logo-image"]} />
            <div className="u-font-2xlg u-font-weight-bold">{content}</div>
            <div className="flex flex-col justify-end flex-1 space-y-4">
              <div className="u-font-md u-font-weight-bold">
                {t.bet}: {legsDisplay(betData, t)}
              </div>
              {betData.legs.map((leg, i) =>
                leg.outcomes.map((outcome, j) => (
                  <div key={i}>
                    <div className="u-font-sm u-font-weight-bold">
                      {outcome.criterionName}: {outcome.outcomeLabel}
                    </div>
                    <div className="u-font-xs">{outcome.eventName}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
