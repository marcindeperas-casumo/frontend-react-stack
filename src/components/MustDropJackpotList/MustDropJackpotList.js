// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import GameRow from "Components/GameRow";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";

type Props = {
  ids: Array<string>,
  areGamesLoaded: boolean,
  title: string,
  initFetchTopLists: () => void,
};
export default class MustDropJackpotList extends PureComponent<Props> {
  componentDidMount() {
    const { areGamesLoaded, initFetchTopLists } = this.props;
    if (!areGamesLoaded) {
      initFetchTopLists();
    }
  }

  render() {
    const { ids, areGamesLoaded, title } = this.props;

    return !areGamesLoaded ? (
      <GameListSkeleton
        className="u-padding--md"
        titleXOffset={100}
        titleYOffset={10}
      />
    ) : (
      <div>
        <div className="u-padding-horiz--md u-padding-bottom--md">
          <List
            items={ids}
            data-test="must-drop-jackpots-list"
            render={id => <GameRow id={id} />}
          />
        </div>
      </div>
    );
  }
}
