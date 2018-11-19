// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import MustDropJackpotsSkeleton from "Components/MustDropJackpots/MustDropJackpotsSkeleton";
import Text from "@casumo/cmp-text";

type Props = {
  ids: Array<string>,
  isLoaded: boolean,
  title: string,
};
export default class MustDropJackpots extends PureComponent<Props> {
  render() {
    const { ids, isLoaded, title } = this.props;

    return !isLoaded ? (
      <MustDropJackpotsSkeleton />
    ) : (
      <div>
        <Text
          align="center"
          size="md"
          className="u-padding--lg t-background-grey-light-2"
        >
          {title}
        </Text>
        <div className="u-padding--md">
          {ids.map(id => (
            <GameRow id={id} key={`jackpot-${id}`} />
          ))}
        </div>
      </div>
    );
  }
}
