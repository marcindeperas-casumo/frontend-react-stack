import schemaReducer from "./schema.reducer";
import { updateEntity, mergeEntity } from "./schema.actions";

describe("Models/Schema/schemaReducer", () => {
  test("should update an entity ", () => {
    const state = schemaReducer(
      {},
      updateEntity({
        cms: {
          "game-slug": { slug: "game-slug", foo: "bar" },
        },
      })
    );

    expect(state).toMatchObject({
      cms: {
        "game-slug": {
          slug: "game-slug",
          foo: "bar",
        },
      },
    });
  });

  test("should update entities", () => {
    const initialState = { cms: { foo: { slug: "foo", bar: 1 } } };
    const state = schemaReducer(
      initialState,
      updateEntity({ cms: { foo: { slug: "foo", bar: 2 } } })
    );

    expect(state).toMatchObject({ cms: { foo: { slug: "foo", bar: 2 } } });
  });

  test("should update multiple entities", () => {
    const initialState = {
      cms: { foo: { slug: "foo", bar: 1 } },
      adventurer: {
        fooId: { tableId: "fooId", foo: "bar" },
        barId: { tableId: "barId", foo: "bar" },
      },
    };

    const state = schemaReducer(
      initialState,
      updateEntity({
        cms: { foo: { slug: "foo", bar: 2 } },
        adventurer: { barId: { tableId: "barId", foo: "bar2" } },
      })
    );

    expect(state).toMatchObject({
      cms: { foo: { slug: "foo", bar: 2 } },
      adventurer: {
        fooId: { tableId: "fooId", foo: "bar" },
        barId: { tableId: "barId", foo: "bar2" },
      },
    });
  });

  test("should merge entities and keep original key", () => {
    const initialState = { cms: { foo: { slug: "foo", bar: 1, baz: 3 } } };
    const state = schemaReducer(
      initialState,
      mergeEntity({ cms: { foo: { slug: "foo", bar: 2 } } })
    );

    expect(state).toMatchObject({
      cms: { foo: { slug: "foo", bar: 2, baz: 3 } },
    });
  });

  test("should merge entities and remove original key if value is null", () => {
    const initialState = { cms: { foo: { slug: "foo", bar: 1, baz: 3 } } };
    const state = schemaReducer(
      initialState,
      mergeEntity({ cms: { foo: { slug: "foo", bar: 2, baz: null } } })
    );

    expect(state).toMatchObject({
      cms: { foo: { slug: "foo", bar: 2 } },
    });
  });
});
