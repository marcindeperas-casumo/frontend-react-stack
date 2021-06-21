import Card from "@casumo/cmp-card";
import React from "react";
import Text from "@casumo/cmp-text";
import { PromotionCardContent } from "Components/PromotionCard/PromotionCardContent";
import { PromotionCardImage } from "Components/PromotionCard/PromotionCardImage";
import "./PromotionCard.scss";
import TrackClick from "Components/TrackClick";
import TrackView from "Components/TrackView";
import * as A from "Types/apollo";
import { EVENT_PROPS, EVENTS } from "../../constants";

type Props = {
  promotion: A.PromotionCard_PromotionFragment;
};

export const PromotionCard = ({ promotion }: Props) => {
  const link = `promotions/${promotion.slug}`;
  const promotionFields = promotion?.fields ? promotion.fields : promotion;
  return (
    <>
      <a className="o-ratio u-margin-bottom--sm cursor-pointer" href={link}>
        <TrackView
          eventName={EVENTS.MIXPANEL_PROMOTION_VIEWED}
          data={{ [EVENT_PROPS.PROMOTION_TYPE]: link }}
        />
        <TrackClick
          eventName={EVENTS.MIXPANEL_PROMOTION_CLICKED}
          data={{ [EVENT_PROPS.PROMOTION_TYPE]: link }}
        >
          <Card
            className="o-ratio__content rounded-2xl bg-white t-elevation--10"
            spacing="none"
            header={() => <PromotionCardImage image={promotionFields.image} />}
            content={() => (
              <PromotionCardContent
                link={link}
                title={promotionFields.title}
                badge={promotionFields.badge}
                dates={promotionFields.subtitle || promotionFields.dates}
                ctaText={promotionFields.ctaText || promotionFields.cta_text}
              />
            )}
          />
        </TrackClick>
      </a>
      {(promotionFields.teaserCaveats || promotionFields.teaser_caveats) && (
        <a href={link}>
          <Text className="text-grey-50 italic px-sm" size="2xs">
            {promotionFields.teaserCaveats || promotionFields.teaser_caveats}
          </Text>
        </a>
      )}
    </>
  );
};
