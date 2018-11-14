// @flow
import React, { PureComponent } from "react";

import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import CuratedCardFooter from "Components/CuratedCard/CuratedCardFooter";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import CuratedCardSkeleton from "Components/CuratedCard/CuratedCardSkeleton";
import { stringToHTML } from "Utils/index";
import EitherOr from "Components/EitherOr";

import "./CuratedCard.scss";

const justify = {
  mobile: "end",
  default: "space-between",
};

const spacing = {
  mobile: "2xlg",
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
  isFetched: boolean,
  fetchCurated: Function,
  onLaunchGame: Function,
|};

export default class CuratedCard extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, fetchCurated } = this.props;

    if (!isFetched) fetchCurated();
  }

  renderSkeleton = () => <CuratedCardSkeleton />;

  renderCard = () => {
    const { gameData, onLaunchGame } = this.props;

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8 t-background-grey-light-2">
        <CuratedCardBackground
          link={gameData ? null : "/en/games/promotions"}
          onLaunchGame={gameData ? onLaunchGame : null}
          {...this.props}
        />
        <Card
          className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--lg"
          justify={justify}
          spacing={spacing}
          header={this.renderHeader}
          footer={this.renderFooter}
        />
      </div>
    );
  };

  renderHeader = () => {
    const { gameData, subtitle, header } = this.props;

    return (
      <React.Fragment>
        {!gameData && (
          <Text
            className="u-font-weight-bold t-color-white u-margin-bottom u-opacity-75"
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
