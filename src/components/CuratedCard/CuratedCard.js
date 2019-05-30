// @flow
import React, { PureComponent } from "react";
import { replace } from "ramda";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import { CuratedCardFooter } from "Components/CuratedCard/CuratedCardFooter";
import { CuratedCardBackground } from "Components/CuratedCard/CuratedCardBackground";
import { CuratedCardSkeleton } from "Components/CuratedCard/CuratedCardSkeleton";
import { stringToHTML } from "Utils";
import { EitherOr } from "Components/EitherOr";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import "./CuratedCard.scss";
import TrackView from "Components/TrackView";
import { CURATED_TYPE, CARD_CLICK_URL } from "Models/curated";

const justify = {
  mobile: "end",
  default: "space-between",
};

const spacing = {
  mobile: "xlg",
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

    const url = CARD_CLICK_URL[typeOfCurated];

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

  componentDidMount() {
    const { isFetched, fetchCurated } = this.props;

    if (!isFetched) {
      fetchCurated();
    }
  }

  renderSkeleton = () => <CuratedCardSkeleton />;

  renderCard = () => {
    const { onLaunchGame, typeOfCurated } = this.props;
    const isGame = typeOfCurated === CURATED_TYPE.GAME;
    const backgroundProps = {
      ...this.props,
      onLaunchGame: isGame ? onLaunchGame : null,
    };

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8">
        <TrackView
          eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_VIEWED}
          data={this.trackData}
        />
        <TrackClick
          eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_CLICKED}
          data={this.trackData}
        >
          <CuratedCardBackground
            link={this.cardClickUrl}
            {...backgroundProps}
          />
          <Card
            className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--lg"
            justify={justify}
            spacing={spacing}
            header={this.renderHeader}
            footer={this.renderFooter}
          />
        </TrackClick>
      </div>
    );
  };

  renderHeader = () => {
    const { subtitle, header, typeOfCurated } = this.props;
    const isGame = typeOfCurated === CURATED_TYPE.GAME;

    return (
      <React.Fragment>
        {!isGame && (
          <Text
            className="u-font-weight-bold t-color-white u-margin-bottom u-text-transform-uppercase u-opacity-75"
            size="xs"
          >
            {subtitle}
          </Text>
        )}
        <Text
          className="u-line-height--1 u-font-weight-bold t-color-white"
          size="3xlg"
          dangerouslySetInnerHTML={stringToHTML(header)}
        />
      </React.Fragment>
    );
  };

  renderFooter = () => <CuratedCardFooter {...this.props} />;

  render() {
    const { isFetched } = this.props;

    return (
      <div className="u-margin-top--md u-margin-top--lg@tablet u-margin-top--lg@desktop u-margin-x--md u-margin-x--3xlg@tablet u-margin-x--3xlg@desktop">
        <EitherOr
          either={this.renderCard}
          or={this.renderSkeleton}
          condition={() => isFetched}
        />
      </div>
    );
  }
}
