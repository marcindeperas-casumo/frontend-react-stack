// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ProgressBar } from "Components/ProgressBar/ProgressBar";
import { stringToHTML } from "Utils/index";
import { CasumoAvatar } from "Components/CasumoAvatar/CasumoAvatar";
import type { Adventurer, AdventureContent } from "Models/adventure";
import "./AdventureCard.scss";

type Props = {
  adventurer: Adventurer,
  content: AdventureContent,
  isContentFetched: boolean,
  isAdventurerFetched: Boolean,
  playerId: string,
  sessionId: string,
  fetchAdventurer: () => void,
  fetchContent: () => void,
  subscribeToUpdates: (playerId: string, sessionId: string) => void,
  unsubscribeFromUpdates: (playerId: string) => void,
};

const AdventureAvatarAndDetails = (props: Props) => {
  const { name, belt, level } = props.adventurer;
  const { level_label } = props.content;

  return (
    <Flex
      align="center"
      className="t-border-r--8 u-width--1/1 u-margin-bottom--md"
    >
      <Flex.Item className="c-adventure-card__avatar o-flex__item-fixed-size">
        <CasumoAvatar belt={belt} />
      </Flex.Item>
      <Flex.Item className="u-margin-left--md">
        <Text
          tag="div"
          className="u-font-weight-bold t-color-white u-margin-bottom--sm"
          size="md"
          dangerouslySetInnerHTML={stringToHTML(name)}
        />
        <Text
          tag="div"
          className="t-color-grey-light-2"
          size="sm"
          dangerouslySetInnerHTML={stringToHTML(
            level_label.replace("{{level}}", level.toString())
          )}
        />
      </Flex.Item>
    </Flex>
  );
};

export class AdventureProgressBar extends React.PureComponent<Props> {
  render() {
    const {
      inBonusMode,
      points,
      pointsRequiredForNextLevel,
    } = this.props.adventurer;

    const progressPercentage = points * 100;

    return (
      <React.Fragment>
        <Flex.Item className="u-width--1/1">
          <ProgressBar
            progress={progressPercentage}
            backgroundColour="grey-dark-3"
          />
        </Flex.Item>
        <Flex
          justify="space-between"
          className="u-width--1/1 u-font-sm t-color-white"
        >
          <Text
            tag="div"
            size="sm"
            dangerouslySetInnerHTML={stringToHTML(
              `<strong>${progressPercentage}% completed</strong> to next level`
            )}
          />
          {!inBonusMode ? (
            <Text
              tag="div"
              size="sm"
              dangerouslySetInnerHTML={stringToHTML(
                `${points} / ${pointsRequiredForNextLevel}`
              )}
            />
          ) : (
            ""
          )}
        </Flex>
      </React.Fragment>
    );
  }
}

export default class AdventureCard extends PureComponent<Props> {
  componentDidMount() {
    const {
      isContentFetched,
      fetchAdventurer,
      playerId,
      sessionId,
      subscribeToUpdates,
    } = this.props;

    if (!isContentFetched) {
      this.props.fetchContent();
    }

    fetchAdventurer();
    subscribeToUpdates(playerId, sessionId);
  }
  componentWillUnmount() {
    const { unsubscribeFromUpdates, playerId } = this.props;

    unsubscribeFromUpdates(playerId);
  }

  render() {
    const { isContentFetched, isAdventurerFetched } = this.props;

    if (!isContentFetched || !isAdventurerFetched) {
      return null;
    }

    return (
      <Flex
        align="center"
        className="t-background-grey-dark-2 u-padding--md"
        direction="vertical"
      >
        <AdventureAvatarAndDetails {...this.props} />
        <AdventureProgressBar {...this.props} />
      </Flex>
    );
  }
}
