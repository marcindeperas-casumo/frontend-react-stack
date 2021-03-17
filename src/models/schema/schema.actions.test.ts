import { types } from "./schema.constants";
import { updateEntity, mergeEntity } from "./schema.actions";

describe("Models/Schema/Actions", () => {
  test("updateEntity()", () => {
    const action = updateEntity({ game: { slug: "foo-bar" } });

    expect(action).toEqual({
      type: types.UPDATE_ENTITY,
      payload: { game: { slug: "foo-bar" } },
    });
  });

  test("mergeEntity()", () => {
    const action = mergeEntity({ game: { slug: "foo-bar" } });

    expect(action).toEqual({
      type: types.MERGE_ENTITY,
      payload: { game: { slug: "foo-bar" } },
    });
  });
});
