import React from "react";
import { PUSHER_CONSTANTS } from "Src/constants";
import "./CustomCampaignTopCard.scss";

type Props = {
  title: string;
  description: string;
  backgroundUrl: string;
};

export const CustomCampaignTopCard = ({
  title,
  description,
  backgroundUrl,
}: Props) => {
  const backgroundImgUrl =
    PUSHER_CONSTANTS.backGroundImageColors[backgroundUrl];

  if (title && description && backgroundUrl) {
    return (
      <div
        className="c-campaign-top-card u-height--full o-flex--vertical u-width--full o-flex-align--end o-flex-justify--space-between u-margin-top--auto"
        style={{
          backgroundImage: `url(${backgroundImgUrl})`,
        }}
      >
        <div className="c-campaign-top-card-content t-color-white u-display--flex o-flex--vertical o-flex-align--start o-flex__item-align--center u-padding-bottom--2xlg u-margin-left--2xlg u-margin-right--2xlg">
          <h1 className="title u-font-xlg u-line-height--2">{title}</h1>
          <p className="u-font-sm u-margin-top--md">{description}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
