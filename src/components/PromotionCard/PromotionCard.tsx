import Card from "@casumo/cmp-card";
import React from "react";
import Text from "@casumo/cmp-text";
import { useTranslatedUrl } from "Utils/hooks";
import { PromotionCardContent } from "Components/PromotionCard/PromotionCardContent";
import { PromotionCardImage } from "Components/PromotionCard/PromotionCardImage";
import "./PromotionCard.scss";
import TrackClick from "Components/TrackClick";
import TrackView from "Components/TrackView";
import * as A from "Types/apollo";
import { TFlattenedPromotion } from "Models/promotions/promotions.types";
import { EVENT_PROPS, EVENTS, ROUTE_IDS } from "../../constants";

type TProps = {
  promotion: A.PromotionCard_PromotionFragment | TFlattenedPromotion;
};

export const PromotionCard = ({ promotion }: TProps) => {
  const promoTranslations = promotion as TFlattenedPromotion;
  const { external_link } = promoTranslations;

  const translatedPromotionDetailRoute = useTranslatedUrl(
    ROUTE_IDS.PROMOTION_DETAILS,
    {
      slug: promotion.slug || promoTranslations.slug,
    }
  );

  const link = external_link ? external_link : translatedPromotionDetailRoute;
  return (
    <>
      <a
        target={external_link ? "blank" : ""}
        className="o-ratio u-margin-bottom--sm cursor-pointer"
        href={link}
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
            className="o-ratio__content rounded-2xl bg-white t-elevation--10"
            spacing="none"
            header={() => (
              <PromotionCardImage image={promoTranslations.image} />
            )}
            content={() => (
              <PromotionCardContent
                link={link}
                title={promoTranslations.title}
                badge={promoTranslations.badge}
                dates={promoTranslations.dates}
                ctaText={promoTranslations.cta_text}
                isExternalLink={Boolean(external_link)}
              />
            )}
          />
        </TrackClick>
      </a>
      {promoTranslations.teaser_caveats && (
        <a target={external_link ? "blank" : ""} href={link}>
          <Text className="text-grey-50 italic px-sm line-clamp-1" size="2xs">
            {promoTranslations.teaser_caveats}
          </Text>
        </a>
      )}
    </>
  );
};
