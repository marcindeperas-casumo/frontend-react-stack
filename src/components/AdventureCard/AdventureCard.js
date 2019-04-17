// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ProgressBar } from "Components/ProgressBar/ProgressBar";
import { stringToHTML } from "Utils/index";
import { CasumoAvatar } from "Components/CasumoAvatar/CasumoAvatar";
import type { Adventurer } from "../../models/adventure";
import "./AdventureCard.scss";

type Props = {
  adventurer: Adventurer,
  playerId: string,
  sessionId: string,
  fetchAdventurer: () => void,
  subscribeToUpdates: (playerId: string, sessionId: string) => void,
  unsubscribeFromUpdates: (playerId: string) => void,
};

const AdventureAvatarAndDetails = (props: Props) => {
  const { name, belt, level } = props.adventurer;
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
          className="u-font-weight-bold t-color-grey-light-2"
          size="sm"
          dangerouslySetInnerHTML={stringToHTML(`Level ${level}`)}
        />
      </Flex.Item>
    </Flex>
  );
};

export class AdventureProgressBar extends React.PureComponent<Props> {
  componentDidMount() {
    const {
      fetchAdventurer,
      subscribeToUpdates,
      playerId,
      sessionId,
    } = this.props;

    fetchAdventurer();
    subscribeToUpdates(playerId, sessionId);
  }
  componentWillUnmount() {
    const { unsubscribeFromUpdates, playerId } = this.props;
    unsubscribeFromUpdates(playerId);
  }

  render() {
    const {
      points,
      pointsRequiredForNextLevel,
      inTravelMode,
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
          {!inTravelMode ? (
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
  render() {
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
