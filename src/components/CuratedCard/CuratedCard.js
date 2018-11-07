// @flow
import React, { PureComponent } from "react";

import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import CuratedCardFooter from "Components/CuratedCard/CuratedCardFooter";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import CuratedCardSkeleton from "Components/CuratedCard/CuratedCardSkeleton";
import { stringToHTML } from "Utils/index";
import { launchGame } from "Services/LaunchGameService";
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

export type Data = {|
  header: string,
  subtitle: string,
  game: string,
  gameData: Object,
  small_image: string,
  medium_image: string,
  large_image: string,
  primary_action_text: string,
  promotions_legal_text: string,
|};

export type Props = {|
  data: Data,
  isFetched: boolean,
  fetchCurated: Function,
|};

export default class CuratedCard extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, fetchCurated } = this.props;

    if (!isFetched) fetchCurated();
  }

  renderSkeleton = () => <CuratedCardSkeleton />;

  renderCard = () => {
    const { data } = this.props;
    const { gameData } = data;
    const isPromo = !Object.keys(gameData).length;

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8">
        <CuratedCardBackground
          link={isPromo ? "/en/games/promotions" : null}
          onClick={isPromo ? null : () => launchGame({ slug: data.game })}
          {...data}
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
    const { data } = this.props;
    const { gameData } = data;
    const isPromo = !Object.keys(gameData).length && data.subtitle;

    return (
      <React.Fragment>
        {isPromo && (
          <Text
            className="u-font-weight-bold t-color-white u-margin-bottom u-opacity-75"
            size="xs"
          >
            {data.subtitle}
          </Text>
        )}
        <Text
          className="u-font-weight-bold t-color-white"
          size="2xlg"
          dangerouslySetInnerHTML={stringToHTML(data.header)}
        />
      </React.Fragment>
    );
  };

  renderFooter = () => {
    const { data } = this.props;

    return (
      <CuratedCardFooter
        game={data.gameData}
        actionText={data.primary_action_text}
        legalText={data.promotions_legal_text}
      />
    );
  };

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
