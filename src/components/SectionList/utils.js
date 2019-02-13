// @flow
import { sort } from "ramda";

export const sortAlphabetically = sort((a, b) => a.localeCompare(b));

export const getSectionForGame = (gameTitle: string) => {
  const firstCharacter = gameTitle.charAt(0).toUpperCase();
  const isNumberRegex = /^\d/;

  return firstCharacter.match(isNumberRegex) ? "#0-9" : firstCharacter;
};

export const getAlphabeticalSections = (list: Array<string>): Array<Object> => {
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
