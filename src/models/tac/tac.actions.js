// @flow
import { fetchPageBySlug } from "Models/cms";
import { cmsSlugs, types } from "./tac.constants";

export const fetchTACAcknowledgements = () => ({
  type: types.fetchTACAcknowledgements,
});

export const fetchVersionContent = (version: string) =>
  fetchPageBySlug(cmsSlugs.content.replace("{v}", version));
