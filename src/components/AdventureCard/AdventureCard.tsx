import Flex from "@casumo/cmp-flex";
import React, { PureComponent } from "react";
import cx from "classnames";
import type { Adventurer, AdventureContent } from "Models/adventure";
import AdventureAvatarAndDetails from "./AdventureAvatarAndDetails";
import AdventureProgressBar from "./AdventureProgressBar";
import "./AdventureCard.scss";

export type Props = {
  adventurer: Adventurer;
  content: AdventureContent;
  isContentFetched: boolean;
  isAdventurerFetched: boolean;
  fetchAdventurer: Function;
  fetchContent: Function;
  subscribeToAdventureUpdates: Function;
  unsubscribeFromAdventureUpdates: Function;
};

const COMPONENT_CLASSNAME = "c-adventure-card";

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
      <div className="u-padding-y--md u-padding-left--md u-padding-x--md u-padding-x--none@desktop">
        <Flex
          align="center"
          className={cx(
            COMPONENT_CLASSNAME,
            "t-border-r--md t-background-white",
            "u-padding-x--md u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop u-padding-y--lg"
          )}
          direction="vertical"
        >
          <AdventureAvatarAndDetails {...this.props} />
          <AdventureProgressBar {...this.props} />
        </Flex>
      </div>
    );
  }
}
