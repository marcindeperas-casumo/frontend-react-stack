// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";
import SectionsList from "Components/SectionsList";

type Props = {
  isLoaded: boolean,
  fetchAllGames: Function,
  games: [],
};

export default class GameSearch extends PureComponent<Props> {
  componentDidMount() {
    const { isLoaded, fetchAllGames } = this.props;

    if (!isLoaded) fetchAllGames();
  }

  render() {
    const { games } = this.props;
    return (
      <Flex direction="vertical" spacing="none">
        <Flex.Block>
          <Flex className="" align="stretch">
            <Flex.Block>
              <div className="t-background-grey-light-2 u-padding--md">
                <SearchInput
                  autoFocus={true}
                  placeholder="Eg. game title, provider"
                />
              </div>
              <div className="u-padding-horiz--md">
                <SectionsList items={games} />
              </div>
            </Flex.Block>
          </Flex>
        </Flex.Block>
      </Flex>
    );
  }
}
