// @flow

type TQuestionEntry = {
  question: string,
  answer: string,
};

export type TResponsibleGamblingTestTranslations = {
  yes: string,
  no: string,
  questions: Array<TQuestionEntry>,
};
