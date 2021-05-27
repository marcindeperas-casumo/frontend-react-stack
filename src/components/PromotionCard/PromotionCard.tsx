import Card from "@casumo/cmp-card";
import React from "react";
import Text from "@casumo/cmp-text";
import { PromotionCardHeader } from "Components/PromotionCard/PromotionCardHeader";
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
  return (
    <div>
      <a className="o-ratio u-margin-bottom--sm" href={link}>
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
            header={() => <PromotionCardImage image={promotion.image} />}
            content={() => (
              <PromotionCardContent
                title={promotion.title}
                badge={promotion.badge}
                dates={promotion.subtitle}
              />
            )}
          />
        </TrackClick>
      </a>
      <a>
        <Text className="text-grey-50 italic" size="xs">
          TO REPLACE - 18+, deposit required, qualifying games only, T&C apply
        </Text>
      </a>
    </div>
  );
};
