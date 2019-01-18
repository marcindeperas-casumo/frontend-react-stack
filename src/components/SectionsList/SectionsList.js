// @flow
import React, { PureComponent } from "react";
import List from "Components/List";
import GameRow from "Components/GameRow";
import { sort } from "ramda";

type Props = {
  /** The list of game ids. */
  items: Array<string>,
  /** The spacing between each GameRow */
  itemSpacing: string,
};

export default class SectionsList extends PureComponent<Props> {
  render() {
    const { items, itemSpacing = "default" } = this.props;
    const sortedItems = sortGamesByName(items);
    const sectionsList = createSectionsList(sortedItems);

    // add a skeleton, change conditional
    if (!sectionsList.length) {
      return <div className="u-padding-vert--md">Loading games ...</div>;
    }

    return (
      <div>
        {sectionsList.map(sectionList => (
          <div key={sectionList.section}>
            <p className="u-font-weight-bold u-font-md u-padding-vert--md">
              {sectionList.section}
            </p>
            <List
              items={sectionList.games}
              itemSpacing={itemSpacing}
              // create new GameRow
              render={id => <GameRow id={id} />}
            />
          </div>
        ))}
      </div>
    );
  }
}

export const sortGamesByName = (items: Array<string>) =>
  sort((a, b) => a.localeCompare(b), items);

export const createSectionsList = (list: Array<string>): Array<Object> => {
  const sectionsListObject = list.reduce((acc, current) => {
    const key = getSectionForGame(current);
    if (key) {
      return {
        ...acc,
        [key]: [...(acc[key] || []), current],
      };
    }
    return acc;
  }, {});

  return Object.keys(sectionsListObject).map(key => ({
    section: key,
    games: sectionsListObject[key],
  }));
};

export const getSectionForGame = (gameTitle: string) => {
  const firstCharacter = gameTitle.charAt(0).toUpperCase();
  const isNumberRegex = /^\d/;

  return firstCharacter.match(isNumberRegex) ? "#0-9" : firstCharacter;
};
