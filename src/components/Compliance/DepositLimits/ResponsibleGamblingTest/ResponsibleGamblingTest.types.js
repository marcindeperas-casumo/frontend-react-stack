// @flow

type TQuestionEntry = {
  question: string,
  answer: string,
};

export type TTranslations = {
  yes: string,
  no: string,
  questions: Array<TQuestionEntry>,
};
