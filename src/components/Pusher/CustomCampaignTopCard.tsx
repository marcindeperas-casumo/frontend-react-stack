import React from "react";
//@ts-ignore
import CloseIcon from "./icons/CloseBtn.png";
import "./CustomCampaignTopCard.scss";

type Props = {
  title: string;
  description: string;
  onCloseClick: () => void;
  imageColor: string;
};

export const CustomCampaignTopCard = ({
  title,
  description,
  onCloseClick,
}: Props) => {
  return (
    <div className="c-campaign-top-card o-flex--vertical u-width--full o-flex-align--end o-flex-justify--space-between u-margin-top--auto">
      <div className="c-campaign-top-card-close-button">
        <img
          onClick={onCloseClick}
          src={CloseIcon}
          className="u-padding--2xlg u-cursor--pointer"
        ></img>
      </div>

      <div className="c-campaign-top-card-content t-color-white u-display--flex o-flex--vertical o-flex-align--start o-flex__item-align--center u-padding-bottom--2xlg u-margin-left--2xlg">
        <h1 className="title u-font-xlg u-line-height--2">
          {title || "Day 5 of 31 offers"}
        </h1>
        <p className="u-font-sm u-margin-top--md">
          {description ||
            "Casumo’s 31 Days of Xmas. A deposit a day keeps surprises coming your way."}
        </p>
      </div>
    </div>
  );
};
