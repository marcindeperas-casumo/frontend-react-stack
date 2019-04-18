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

class AdventureAvatarAndDetails extends PureComponent<Props> {
  render() {
    const { name, belt, level, inBonusMode } = this.props.adventurer;
    const { level_label, bonus_mode_label } = this.props.content;
    const levelLabel = inBonusMode
      ? `${level_label} | <strong class="t-color-violet">${bonus_mode_label}</strong>`
      : level_label;

    return (
      <Flex
        align="center"
        className="t-border-r--8 u-width--1/1 u-margin-bottom--md"
      >
        <Flex.Item className="c-adventure-card__avatar o-flex__item-fixed-size">
          <CasumoAvatar
            belt={belt}
            backgroundColour={inBonusMode ? "violet" : "teal"}
          />
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
              levelLabel.replace("{{level}}", level.toString())
            )}
          />
        </Flex.Item>
      </Flex>
    );
  }
}

class AdventureProgressBar extends PureComponent<Props> {
  render() {
    const {
      inBonusMode,
      points,
      pointsRequiredForNextLevel,
    } = this.props.adventurer;
    const {
      progression_label_standard,
      progression_label_bonus,
    } = this.props.content;
    const progressPercentage = Math.floor(
      (points / pointsRequiredForNextLevel) * 100
    );
    const progressionLabel = inBonusMode
      ? progression_label_bonus
      : progression_label_standard;

    return (
      <React.Fragment>
        <Flex.Item className="u-width--1/1">
          <ProgressBar
            progress={progressPercentage}
            backgroundColour="grey-dark-3"
            foregroundColour={inBonusMode ? "violet" : "yellow"}
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
              progressionLabel.replace(
                "{{progression}}",
                progressPercentage.toString()
              )
            )}
          />
          <Text
            tag="div"
            size="sm"
            dangerouslySetInnerHTML={stringToHTML(
              `${points} / ${pointsRequiredForNextLevel}`
            )}
          />
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
