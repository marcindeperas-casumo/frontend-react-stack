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
  fetchAdventurer: Function,
  fetchContent: Function,
  subscribeToAdventureUpdates: Function,
  unsubscribeFromAdventureUpdates: Function,
};

export default class AdventureCard extends PureComponent<Props> {
  componentDidMount() {
    const {
      isContentFetched,
      isAdventurerFetched,
      fetchAdventurer,
      fetchContent,
      subscribeToAdventureUpdates,
    } = this.props;

    if (!isContentFetched) {
      fetchContent();
    }

    if (!isAdventurerFetched) {
      fetchAdventurer();
    }

    subscribeToAdventureUpdates();
  }

  componentWillUnmount() {
    this.props.unsubscribeFromAdventureUpdates();
  }

  render() {
    if (!this.props.isContentFetched || !this.props.isAdventurerFetched) {
      return null;
    }

    return (
      <Flex
        align="center"
        className="t-background-white u-padding-x--md u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop u-padding-y--lg"
        direction="vertical"
      >
        <AdventureAvatarAndDetails {...this.props} />
        <AdventureProgressBar {...this.props} />
      </Flex>
    );
  }
}
