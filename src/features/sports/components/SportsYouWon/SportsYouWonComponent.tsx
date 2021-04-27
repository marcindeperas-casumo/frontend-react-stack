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

const getBetId = (currentHash: string) => {
  return currentHash.substr(currentHash.indexOf(PROP_NAME) + PROP_NAME.length);
};

const getBetData = (betId: string) => {
  return betId;
};

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

  const betData = getBetData(getBetId(currentHash));

  // @ts-ignore
  return (
    <div
      className="c-sports-youwon
                t-background-grey-70
                t-opacity-background--75
                u-position-fixed
                u-width--screen
                u-height--screen,
                u-top-0
                u-bottom-0
                u-left-0
                u-right-0
                u-zindex--modal
                t-color-white,
                u-flex-center"
    >
      <div
        className="c-sports-youwon-content
                  t-background-purple-50
                  t-opacity-background--100
                  t-color-white
                  u-position-relative
                  t-back"
        style={{
          "background-image": `url('${page.fields["background-image"]}'`,
          "background-position": "top right",
          "background-repeat": "no-repeat",
        }}
      >
        <div className="c-sports-youwon-close u-cursor-pointer">
          <CloseIcon onClick={() => removeYouWonParam(currentHash)} />
        </div>
        {betData}
      </div>
    </div>
  );
};
