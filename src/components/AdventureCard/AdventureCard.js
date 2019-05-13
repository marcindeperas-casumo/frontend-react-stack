// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import { type Adventurer, type AdventureContent } from "Models/adventure";
import AdventureAvatarAndDetails from "./AdventureAvatarAndDetails";
import AdventureProgressBar from "./AdventureProgressBar";
import "./AdventureCard.scss";

export type Props = {
  adventurer: Adventurer,
  content: AdventureContent,
  isContentFetched: boolean,
  isAdventurerFetched: boolean,
  playerId: string,
  sessionId: string,
  fetchAdventurer: () => void,
  fetchContent: () => void,
  subscribeToUpdates: (playerId: string, sessionId: string) => void,
  unsubscribeFromUpdates: (playerId: string) => void,
};

export default class AdventureCard extends PureComponent<Props> {
  componentDidMount() {
    const {
      isContentFetched,
      isAdventurerFetched,
      fetchAdventurer,
      fetchContent,
      playerId,
      sessionId,
      subscribeToUpdates,
    } = this.props;

    if (!isContentFetched) {
      fetchContent();
    }

    if (!isAdventurerFetched) {
      fetchAdventurer();
    }

    subscribeToUpdates(playerId, sessionId);
  }
  componentWillUnmount() {
    this.props.unsubscribeFromUpdates(this.props.playerId);
  }

  render() {
    if (!this.props.isContentFetched || !this.props.isAdventurerFetched) {
      return null;
    }

    return (
      <Flex
        align="center"
        className="t-background-grey-dark-3 u-padding-horiz--md u-padding-vert--lg"
        direction="vertical"
      >
        <AdventureAvatarAndDetails {...this.props} />
        <AdventureProgressBar {...this.props} />
      </Flex>
    );
  }
}
