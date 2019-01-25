// @flow
import { sort } from "ramda";

export const sortGamesByName = (items: Array<string>) =>
  sort((a, b) => a.localeCompare(b), items);

export const createAlphabeticalSectionsList = (
  list: Array<string>
): Array<Object> => {
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
    title: key,
    data: sectionsListObject[key],
  }));
};

export const getSectionForGame = (gameTitle: string) => {
  const firstCharacter = gameTitle.charAt(0).toUpperCase();
  const isNumberRegex = /^\d/;

  return firstCharacter.match(isNumberRegex) ? "#0-9" : firstCharacter;
};
