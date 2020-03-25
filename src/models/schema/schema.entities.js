// @flow
import { schema, normalize } from "normalizr";
import { ENTITY_KEYS } from "./schema.constants";

export const acknowledgements = new schema.Entity(ENTITY_KEYS.ACKNOWLEDGEMENTS);

export const cms = new schema.Entity(
  ENTITY_KEYS.CMS,
  {},
  { idAttribute: "slug" }
);

export const schemaEntities = {
  // Question: Not sure defining the keys like this is good DX. If you're
  // seeing this and think it should be done differently, create a PR with your
  // suggestion.
  [ENTITY_KEYS.CMS]: cms,
  [`${ENTITY_KEYS.CMS}s`]: [cms],
  [ENTITY_KEYS.ACKNOWLEDGEMENTS]: acknowledgements,
};

export const normalizeData = (data: any) => normalize(data, schemaEntities);

export default schemaEntities;
