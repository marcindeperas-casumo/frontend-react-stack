// @flow
import React, { PureComponent } from "react";
import { GameRow } from "Components/GameRow";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import type { GroupedGamesList, EvolutionLobbyType } from "Models/liveCasino";
import SectionTitle from "./SectionTitle";

type Props = {
  /** grouped list of games to render */
  groupedLiveGames: GroupedGamesList,
  /** used to decide if data needs to be fetched */
  areTranslationsFetched: boolean,
  /** used to fetch page if areTranslationsFetched === false */
  translations: { [EvolutionLobbyType]: string },
  fetchTranslations: () => void,
  initFetchAllLiveGames: () => void,
};

export default class LiveCasinoDetailPage extends PureComponent<Props> {
  componentDidMount() {
    this.props.initFetchAllLiveGames();

    if (!this.props.areTranslationsFetched) {
      this.props.fetchTranslations();
    }
  }

  render() {
    return (
      <div className="t-background-chrome-light-2 u-padding-x--md u-padding-bottom--md">
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: "Live Casino - Details Page" }}
        >
          {this.props.groupedLiveGames.map(([id, gamesInSection]) => (
            <React.Fragment key={id}>
              <SectionTitle title={this.props.translations[id] || id} />
              <div data-test-id="live-casino-detail-list">
                {gamesInSection.map(slug => (
                  <div key={slug} className="u-margin-bottom">
                    <GameRow id={slug} />
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </TrackProvider>
      </div>
    );
  }
}
