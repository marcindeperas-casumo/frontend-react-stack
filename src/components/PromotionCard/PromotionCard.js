// @flow
import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import PromotionCardHeader from "Components/PromotionCard/PromotionCardHeader";
import PromotionCardContent from "Components/PromotionCard/PromotionCardContent";
import PromotionCardImage from "Components/PromotionCard/PromotionCardImage";
import PromotionCardSkeleton from "Components/PromotionCard/PromotionCardSkeleton";
import "./PromotionCard.scss";
import TrackClick from "Components/TrackClick";
import { EVENT_PROPS, EVENTS } from "../../constants";

type WrapperProps = {
  image: string,
  badge: string,
  link: string,
  dates: string,
  title: string,
};

export type Props = WrapperProps & {
  isFetched: boolean,
};

const PromotionCardWrapper = ({
  link,
  image,
  badge,
  dates,
  title,
}: WrapperProps) => {
  return (
    <a href={link} className="o-ratio o-ratio--promotion-card">
      <Card
        className="o-ratio__content t-border-r--md t-background-white"
        spacing="none"
        header={() => <PromotionCardHeader badge={badge} dates={dates} />}
        content={() => <PromotionCardContent title={title} />}
        footer={() => <PromotionCardImage image={image} />}
      />
    </a>
  );
};

export default class PromotionCard extends PureComponent<Props> {
  render() {
    const { isFetched, image, badge, link, dates, title } = this.props;

    if (!isFetched) {
      return <PromotionCardSkeleton />;
    }

    return (
      <TrackClick
        eventName={EVENTS.MIXPANEL_PROMOTION_CLICKED}
        data={{ [EVENT_PROPS.PROMOTION_TYPE]: link }}
      >
        <PromotionCardWrapper
          link={link}
          image={image}
          badge={badge}
          dates={dates}
          title={title}
        />
      </TrackClick>
    );
  }
}
