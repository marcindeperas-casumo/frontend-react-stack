// @flow
import gql from "graphql-tag";
import {
  generateTranslationsQuery,
  generateTranslationsQueryMock,
} from "./apolloTestUtils";

describe("apolloTestUtils", () => {
  describe("generateTranslationsQuery", () => {
    test("it generates translations query object according to a standard", () => {
      const query = generateTranslationsQuery({
        one: "root:one-id",
        two: "root:two-id",
      });

      expect(query).toEqual(gql`
        query TranslationsQuery {
          one: getCMSField(id: "root:one-id") {
            id
            text
          }
          two: getCMSField(id: "root:two-id") {
            id
            text
          }
        }
      `);
    });
  });

  describe("generateTranslationsQueryMock", () => {
    test("it generates translations query response mock", () => {
      const key = "three";
      const id = "root:three-id";
      const text = "Three";
      const mockedData = {
        [key]: text,
      };
      const keyIdMap = {
        [key]: "root:three-id",
      };
      const query = generateTranslationsQuery(keyIdMap);

      expect(
        generateTranslationsQueryMock(query, keyIdMap, mockedData)
      ).toEqual({
        request: {
          query,
        },
        result: {
          data: {
            [key]: {
              id,
              text,
              __typename: "CmsText",
            },
          },
        },
      });
    });
  });
});
