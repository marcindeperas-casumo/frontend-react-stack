import * as React from "react";
import "./SportsYouWon.scss";
import { CloseIcon } from "@casumo/cmp-icons";

type Props = {
  currentHash: string;
  loaded: boolean;
  page: any;
  fetchPage: () => void;
};

const PROP_NAME = "?youwon=";

const showModal = (currentHash: string) => {
  return currentHash.indexOf(PROP_NAME) > -1;
};

// const getBetId = (currentHash: string) => {
//   return currentHash.substr(currentHash.indexOf(PROP_NAME) + PROP_NAME.length);
// };
//
// const getBetData = (betId: string) => {
//   return betId;
// };

const removeYouWonParam = currentHash => {
  // eslint-disable-next-line fp/no-mutation
  window.location.hash = window.location.hash.substr(
    0,
    currentHash.indexOf(PROP_NAME)
  );
};

export const SportsYouWonComponent = ({
  loaded,
  page,
  currentHash,
  fetchPage,
}: Props) => {
  if (!showModal(currentHash)) {
    return null;
  }

  if (!loaded) {
    fetchPage();
    return null;
  }

  // const betData = getBetData(getBetId(currentHash));

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
          backgroundImage: `url('${page.fields["background-image"]}'`,
        }}
      >
        <div
          className="h-full relative top-0 left-0 bottom-0 right-0 bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url('${page.fields["animation1"]}'`,
          }}
        >
          <CloseIcon
            onClick={() => removeYouWonParam(currentHash)}
            className="cursor-pointer absolute top-0 right-0 u-margin-top--md u-margin-right--md"
          />
          <div className="u-padding-x--2xlg u-padding-top--4xlg u-padding-bottom--lg flex flex-col items-start space-y-4 h-full">
            <img src={page.fields["logo-image"]} />
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
