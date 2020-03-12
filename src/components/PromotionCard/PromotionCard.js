// @flow
import React from "react";
import Card from "@casumo/cmp-card";
import { PromotionCardHeader } from "Components/PromotionCard/PromotionCardHeader";
import { PromotionCardContent } from "Components/PromotionCard/PromotionCardContent";
import { PromotionCardImage } from "Components/PromotionCard/PromotionCardImage";
import "./PromotionCard.scss";
import TrackClick from "Components/TrackClick";
import TrackView from "Components/TrackView";
import * as A from "Types/apollo";
import { EVENT_PROPS, EVENTS } from "../../constants";

type Props = {
  promotion: A.PromotionCard_Promotion,
};

export const PromotionCard = ({ promotion }: Props) => {
  const link = `promotions/${promotion.slug}`;
  return (
    <a
      href={link}
      className="o-ratio o-ratio--promotion-card u-margin-bottom--sm"
    >
      <TrackView
        eventName={EVENTS.MIXPANEL_PROMOTION_VIEWED}
        data={{ [EVENT_PROPS.PROMOTION_TYPE]: link }}
      />
      <TrackClick
        eventName={EVENTS.MIXPANEL_PROMOTION_CLICKED}
        data={{ [EVENT_PROPS.PROMOTION_TYPE]: link }}
      >
        <Card
          className="o-ratio__content t-border-r--md t-background-white t-box-shadow"
          spacing="none"
          header={() => (
            <PromotionCardHeader
              badge={promotion.badge}
              dates={promotion.subtitle}
            />
          )}
          content={() => <PromotionCardContent title={promotion.title} />}
          footer={() => <PromotionCardImage image={promotion.image} />}
        />
      </TrackClick>
    </a>
  );
};
