// @flow
import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import CuratedCardFooter from "Components/CuratedCard/CuratedCardFooter";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import CuratedCardSkeleton from "Components/CuratedCard/CuratedCardSkeleton";
import { stringToHTML } from "Utils";
import EitherOr from "Components/EitherOr";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import "./CuratedCard.scss";

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
|};

export default class CuratedCard extends PureComponent<Props> {
  /* TODO: Move URLs to a central configuration
     For the time being these are the assumptions:
     If not game
     Then promotion, if not promotion
     by default the redirection url will be deposit
     This needs refactoring so that curated card will handle different types of curated card types
  */
  get cardClickUrl() {
    const { gameData, promotion = [] } = this.props;
    const [promotionSlug = ""] = promotion;
    const isGame = Boolean(gameData);

    // If there is a game selected, we don't link to anything,
    // we just use the onLaunchGame() prop.
    if (isGame) {
      return null;
    }

    if (promotionSlug) {
      return `/en/promotions/${promotionSlug}`;
    }

    return "/en/cash/deposit";
  }

  get trackClickData() {
    const { typeOfCurated, subtitle, gameData } = this.props;
    const isGame = Boolean(gameData);

    return {
      [EVENT_PROPS.CURATED_TYPE]: typeOfCurated,
      [EVENT_PROPS.CURATED_NAME]: isGame ? gameData.name : subtitle,
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
    const { onLaunchGame, gameData } = this.props;
    const isGame = Boolean(gameData);

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8">
        <TrackClick
          eventName={EVENTS.CURATED_COMPONENT_CLICKED}
          data={this.trackClickData}
        >
          <CuratedCardBackground
            link={this.cardClickUrl}
            onLaunchGame={isGame ? onLaunchGame : null}
            {...this.props}
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
    const { gameData, subtitle, header } = this.props;

    return (
      <React.Fragment>
        {!gameData && (
          <Text
            className="u-font-weight-bold t-color-white u-margin-bottom u-text-transform-uppercase u-opacity-75"
            size="xs"
          >
            {subtitle}
          </Text>
        )}
        <Text
          className="u-line-height--1 u-font-weight-bold t-color-white"
          size="2xlg"
          dangerouslySetInnerHTML={stringToHTML(header)}
        />
      </React.Fragment>
    );
  };

  renderFooter = () => <CuratedCardFooter {...this.props} />;

  render() {
    const { isFetched } = this.props;

    return (
      <div className="u-margin-top--md u-margin-top--lg@tablet u-margin-top--lg@desktop u-margin-horiz--md u-margin-horiz--2xlg@tablet u-margin-horiz--2xlg@desktop">
        <EitherOr
          either={this.renderCard}
          or={this.renderSkeleton}
          condition={() => isFetched}
        />
      </div>
    );
  }
}
