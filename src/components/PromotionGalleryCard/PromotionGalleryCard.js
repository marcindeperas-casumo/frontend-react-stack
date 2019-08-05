// @flow
import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import PromotionGalleryCardHeader from "Components/PromotionGalleryCard/PromotionGalleryCardHeader";
import PromotionGalleryCardContent from "Components/PromotionGalleryCard/PromotionGalleryCardContent";
import PromotionGalleryCardImage from "Components/PromotionGalleryCard/PromotionGalleryCardImage";
import PromotionGalleryCardSkeleton from "Components/PromotionGalleryCard/PromotionGalleryCardSkeleton";
import "./PromotionGalleryCard.scss";

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

const PromotionGalleryCardWrapper = ({
  link,
  image,
  badge,
  dates,
  title,
}: WrapperProps) => {
  return (
    <div className="c-promotion-gallery-card u-width--1/2 u-padding--sm@mobile u-padding">
      <a
        href={link}
        className="o-ratio o-ratio--promotion-card o-flex__item o-flex__item--no-shrink"
      >
        <Card
          className="o-ratio__content t-border-r--md t-background-white u-line-height--1"
          spacing="none"
          header={() => (
            <PromotionGalleryCardHeader badge={badge} dates={dates} />
          )}
          content={() => <PromotionGalleryCardContent title={title} />}
          footer={() => <PromotionGalleryCardImage image={image} />}
        />
      </a>
    </div>
  );
};

export default class PromotionGalleryCard extends PureComponent<Props> {
  render() {
    const { isFetched, image, badge, link, dates, title } = this.props;

    if (!isFetched) {
      return <PromotionGalleryCardSkeleton />;
    }

    return (
      <PromotionGalleryCardWrapper
        link={link}
        image={image}
        badge={badge}
        dates={dates}
        title={title}
      />
    );
  }
}
