// @flow
import React, { PureComponent } from "react";
import { replace } from "ramda";
import Card from "@casumo/cmp-card";
import { Mobile, Desktop } from "Components/ResponsiveLayout";
import {
  CuratedCardFooterText,
  CuratedCardFooterGame,
  CuratedCardFooterGameDesktop,
} from "Components/CuratedCard/CuratedCardFooter";
import { CuratedCardBackground } from "Components/CuratedCard/CuratedCardBackground";
import {
  CuratedCardHeader,
  CuratedCardHeaderDesktop,
  CuratedCardHeaderWithSubtitle,
} from "Components/CuratedCard/CuratedCardHeader";
import { CuratedCardSkeleton } from "Components/CuratedCard/CuratedCardSkeleton";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import "./CuratedCard.scss";
import TrackView from "Components/TrackView";
import { CURATED_TYPE, CARD_CLICK_URL } from "Models/curated";

const spacing = {
  mobile: "md",
  desktop: "5xlg",
  default: "lg",
};

export type Props = {|
  header: string,
  subtitle: string,
  game: string,
  gameData: Object,
  small_image: string,
  medium_image: string,
  large_image: string,
  primary_action_text: string,
  promotions_legal_text: string,
  promotion: Array<string>,
  isFetched: boolean,
  fetchCurated: Function,
  onLaunchGame: Function,
  typeOfCurated: string,
  curatedSlug: string,
|};

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
    const { typeOfCurated, curatedSlug = "" } = this.props;

    return {
      [EVENT_PROPS.CURATED_TYPE]: typeOfCurated,
      [EVENT_PROPS.CURATED_SLUG]: curatedSlug.split(".")[1],
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
    const backgroundProps = {
      ...this.props,
      onLaunchGame: this.isGame ? this.props.onLaunchGame : null,
      link: this.cardClickUrl,
    };

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card">
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
            className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--md@phablet u-padding--lg"
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
      <>
        <Mobile>
          <CuratedCardHeader header={this.props.header} />
        </Mobile>
        <Desktop>
          <CuratedCardHeaderDesktop header={this.props.header} />
        </Desktop>
      </>
    ) : (
      <CuratedCardHeaderWithSubtitle
        header={this.props.header}
        subtitle={this.props.subtitle}
      />
    );

  renderFooter = () =>
    this.isGame ? (
      <>
        <Mobile>
          <CuratedCardFooterGame
            gameData={this.props.gameData}
            buttonText={this.props.primary_action_text}
            onLaunchGame={this.props.onLaunchGame}
          />
        </Mobile>
        <Desktop>
          <CuratedCardFooterGameDesktop
            gameData={this.props.gameData}
            buttonText={this.props.primary_action_text}
            onLaunchGame={this.props.onLaunchGame}
          />
        </Desktop>
      </>
    ) : (
      <CuratedCardFooterText text={this.props.promotions_legal_text} />
    );

  render() {
    return this.props.isFetched ? this.renderCard() : <CuratedCardSkeleton />;
  }
}
