// @flow
import React, { PureComponent } from "react";
import { replace } from "ramda";
import classNames from "classnames";
import Card from "@casumo/cmp-card";
import {
  CuratedCardFooterText,
  CuratedCardFooterGame,
} from "Components/CuratedCard/CuratedCardFooter";
import { CuratedCardBackground } from "Components/CuratedCard/CuratedCardBackground";
import {
  CuratedCardHeader,
  CuratedCardHeaderWithSubtitle,
} from "Components/CuratedCard/CuratedCardHeader";
import { CuratedCardSkeleton } from "Components/CuratedCard/CuratedCardSkeleton";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import "./CuratedCard.scss";
import TrackView from "Components/TrackView";
import {
  CURATED_TYPE,
  CARD_CLICK_URL,
  prefixCuratedSlug,
} from "Models/curated";

const spacing = {
  mobile: "md",
  desktop: "5xlg",
  default: "lg",
};

type PropsBase = {|
  header: string,
  subtitle: string,
  game: string,
  gameData: Object,
  primary_action_text: string,
  promotions_legal_text: string,
  promotion: Array<string>,
  isFetched: boolean,
  fetchCurated: Function,
  onLaunchGame: Function,
  typeOfCurated: string,
  slug: string,
  className?: string,
|};
type PropsNew = {|
  ...PropsBase,
  image: string,
|};
type PropsDeprecated = {|
  ...PropsBase,
  small_image: string,
  medium_image: string,
  large_image: string,
|};

export type Props = PropsNew | PropsDeprecated;

export class CuratedCard extends PureComponent<Props> {
  get cardClickUrl() {
    const { typeOfCurated, promotion = [] } = this.props;
    const [promotionSlug = ""] = promotion;

    const url = CARD_CLICK_URL[typeOfCurated] || null;

    if (typeOfCurated === CURATED_TYPE.PROMOTION) {
      return replace("#promotionSlug", promotionSlug, url);
    }

    return url;
  }

  get trackData() {
    const { typeOfCurated, slug = "" } = this.props;

    return {
      [EVENT_PROPS.CURATED_TYPE]: typeOfCurated,
      [EVENT_PROPS.CURATED_SLUG]: prefixCuratedSlug(slug),
    };
  }

  get isGame() {
    return this.props.typeOfCurated === CURATED_TYPE.GAME;
  }

  componentDidMount() {
    const { isFetched, fetchCurated } = this.props;

    if (!isFetched) {
      fetchCurated();
    }
  }

  renderCard = () => {
    const { className = "" } = this.props;
    const backgroundProps = {
      ...this.props,
      onLaunchGame: this.isGame
        ? () => this.props.onLaunchGame(this.props.gameData.slug)
        : null,
      link: this.cardClickUrl,
    };

    return (
      <div
        className={classNames(
          "c-curated-card o-ratio o-ratio--curated-card",
          className
        )}
      >
        <TrackView
          eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_VIEWED}
          data={this.trackData}
        />
        <TrackClick
          eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_CLICKED}
          data={this.trackData}
        >
          <CuratedCardBackground {...backgroundProps} />
          <Card
            className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--md@phablet u-padding--lg u-padding-x--3xlg@desktop"
            justify="end"
            spacing={spacing}
            header={this.renderHeader}
            footer={this.renderFooter}
          />
        </TrackClick>
      </div>
    );
  };

  renderHeader = () =>
    this.isGame ? (
      <CuratedCardHeader header={this.props.header} />
    ) : (
      <CuratedCardHeaderWithSubtitle
        header={this.props.header}
        subtitle={this.props.subtitle}
      />
    );

  renderFooter = () =>
    this.isGame ? (
      <CuratedCardFooterGame
        gameData={this.props.gameData}
        buttonText={this.props.primary_action_text}
        onLaunchGame={() => this.props.onLaunchGame(this.props.gameData.slug)}
      />
    ) : (
      <CuratedCardFooterText text={this.props.promotions_legal_text} />
    );

  render() {
    return this.props.isFetched ? this.renderCard() : <CuratedCardSkeleton />;
  }
}
