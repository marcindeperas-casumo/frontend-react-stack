import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Flex from "@casumo/cmp-flex";
import React, { PureComponent } from "react";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import games from "./__mocks__/games";
import VirtualList from "./";

const stories = storiesOf("VirtualList", module);

type State = any;

class MyComponent extends PureComponent<{}, State> {
  PAGE_SIZE: any;
  REMOTE_ROWS_COUNT: any;
  ROW_HEIGHT: any;
  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();
    this.ROW_HEIGHT = 80;
    this.PAGE_SIZE = 50;
    this.REMOTE_ROWS_COUNT = 250;
    this.state = {
      list: [],
      pagesLoaded: [],
    };
  }

  isRowLoaded = ({ index }) => {
    return Boolean(this.state.list[index]);
  };

  loadMoreRows = ({ startIndex, stopIndex }) => {
    if (
      !this.isRowLoaded(startIndex) &&
      !this.state.pagesLoaded.includes(startIndex)
    ) {
      this.setState({
        pagesLoaded: [...this.state.pagesLoaded, startIndex],
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(games);
        }, 3000 + Math.round(Math.random() * 1000));
      }).then(gamesList => {
        this.setState({
          // @ts-expect-error ts-migrate(2488) FIXME: Type 'unknown' must have a '[Symbol.iterator]()' m... Remove this comment to see the full error message
          list: [...this.state.list, ...gamesList],
        });
        return this.state.list;
      });
    }
    return Promise.resolve(this.state.list);
  };

  renderRow = ({ key, index, style }) => {
    if (this.isRowLoaded({ index })) {
      return (
        <div
          key={key}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; key: any; index: any; s... Remove this comment to see the full error message
          index={index}
          style={style}
          className="t-border-bottom border-grey-5"
        >
          <GameRow
            game={this.state.list[index]}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: any; onLaunchGame: () => HandlerFunc... Remove this comment to see the full error message
            onLaunchGame={() => action(this.state.list[index].name)}
            renderText={() => (
              <GameRowText name={this.state.list[index].name} />
            )}
          />
        </div>
      );
    }
    return (
      <Flex
        align="center"
        key={key}
        index={index}
        style={style}
        className="t-border-bottom border-grey-5"
      >
        loading...
      </Flex>
    );
  };

  render() {
    return (
      <div>
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <VirtualList
          isRowLoaded={this.isRowLoaded}
          rowHeight={this.ROW_HEIGHT}
          totalNumberOfRows={this.REMOTE_ROWS_COUNT}
          loadMoreRows={this.loadMoreRows}
          rowRenderer={this.renderRow}
          pageSize={this.PAGE_SIZE}
        />
      </div>
    );
  }
}

stories.add("Default", () => <MyComponent />);
