import * as React from "react";
import "./SportsYouWon.scss";
import { CloseIcon } from "@casumo/cmp-icons";
import { useTranslations } from "Utils/hooks";
import { BET_DATA } from "./__mocks__/mock";
import type { SportsYouWonTranslations } from "./SportsYouWon.types";

type Props = {
  currentHash: string;
  loaded: boolean;
  page: any;
  fetchPage: () => void;
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

// export const legsDisplay = (props: any) => {
//   if (props.numberOfLegs === 1 && props.singleLegDetails.outcomes.length > 1) {
//     return "Bet builder";
//   }
//   switch (props.numberOfLegs) {
//     case 1:
//       return "Single";
//     case 2:
//       return "Double";
//     case 3:
//       return "Triple";
//     case 4:
//       return "FourFold";
//     default:
//       return "MultiFold";
//   }
// };

const removeYouWonParam = currentHash => {
  // eslint-disable-next-line fp/no-mutation
  window.location.hash = window.location.hash.substr(
    0,
    currentHash.indexOf(PROP_NAME)
  );
};

export const SportsYouWonComponent = ({ currentHash }: Props) => {
  const t = useTranslations<SportsYouWonTranslations>(CMS_SLUG);

  if (!showModal(currentHash) || !t) {
    return null;
  }

  const betData = getBetData(getBetId(currentHash));
  console.log("***", betData);

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
            backgroundImage: `url('${t["animation1"]}'`,
          }}
        >
          <CloseIcon
            onClick={() => removeYouWonParam(currentHash)}
            className="cursor-pointer absolute top-0 right-0 u-margin-top--md u-margin-right--md"
          />
          <div className="u-padding-x--2xlg u-padding-top--4xlg u-padding-bottom--lg flex flex-col items-start space-y-4 h-full">
            <img src={t["logo-image"]} />
            <div className="u-font-2xlg u-font-weight-bold">
              ddurans won €125.20 on sports
            </div>
            <div className="flex flex-col justify-end flex-1 space-y-4">
              <div className="u-font-md u-font-weight-bold">Bet: Double</div>
              <div>
                <div className="u-font-sm u-font-weight-bold">
                  Full time: Juventus
                </div>
                <div className="u-font-xs">Juventus-Lyon</div>
              </div>
              <div>
                <div className="u-font-sm u-font-weight-bold">
                  Full time: Manchester City
                </div>
                <div className="u-font-xs">Manchester City - Real Madrit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
