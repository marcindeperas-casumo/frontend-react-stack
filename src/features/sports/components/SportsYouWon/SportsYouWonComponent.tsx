import * as React from "react";
import "./SportsYouWon.scss";
import { CloseIcon } from "@casumo/cmp-icons";
import { useQuery } from "@apollo/client";
import { formatCurrency } from "Utils";
import { useLocale, useTranslations } from "Utils/hooks";
import type {
  BetCombinationRefType,
  SportsYouWonTranslations,
} from "./SportsYouWon.types";
import { BET_DETAILS_QUERY } from "./SportsYouWonQuery";

type Props = {
  currentHash: string;
};

const PROP_NAME = "?youwon=";
const CMS_SLUG = "sports.sports-you-won-modal";

export const showModal = (currentHash: string) => {
  return currentHash.indexOf(PROP_NAME) > -1;
};

const getBetId = (currentHash: string) => {
  return currentHash.substr(currentHash.indexOf(PROP_NAME) + PROP_NAME.length);
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
  const { data: betDetails } = useQuery(BET_DETAILS_QUERY, {
    variables: { combinationRef: getBetId(currentHash) },
  });

  if (!showModal(currentHash) || !t || !betDetails) {
    return null;
  }

  const betData: BetCombinationRefType = betDetails.betDetails;

  if (betData.status !== "WON") {
    return null;
  }

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
                o-position--fixed
                o-inset--none
                u-width-screen
                u-height-screen
                z-modal
                o-flex-align--center
                o-flex-justify--center"
    >
      <div
        className="c-sports-youwon-content
                    t-border-r--md
                    t-border-r--none@phablet
                    t-border-r--none@mobile
                    bg-purple-50
                    bg-opacity-100
                    color-white
                    o-position--relative
                    bg-right-top
                    bg-no-repeat"
        style={{
          backgroundImage: `url('${t["background-image"]}'`,
        }}
      >
        <div
          className="u-height--full o-position--relative o-inset--none bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url('${t[`animation${getRndInteger(1, 2)}`]}'`,
          }}
        >
          <CloseIcon
            onClick={() => removeYouWonParam(currentHash)}
            className="u-cursor--pointer o-position--absolute o-inset-top--none o-inset-right--none u-margin-top--md u-margin-right--md"
          />
          <div className="u-padding-x--2xlg u-padding-top--4xlg u-padding-bottom--lg o-flex--vertical o-flex-align--start u-height--full">
            <img src={t["logo-image"]} className="u-margin-bottom" />
            <div className="u-font-2xlg u-font-weight-bold u-margin-bottom">
              {content}
            </div>
            <div className="o-flex--vertical o-flex-justify--end o-flex--1 u-margin-bottom">
              <div className="u-font-md u-font-weight-bold u-margin-bottom">
                {t.bet}: {legsDisplay(betData, t)}
              </div>
              {betData.legs.map((leg, i) =>
                leg.outcomes.map((outcome, j) => (
                  <div key={i} className="u-margin-bottom">
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
