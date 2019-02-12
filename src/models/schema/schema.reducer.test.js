import schemaReducer from "./schema.reducer";
import { updateEntity } from "./schema.actions";

describe("Models/Schema/schemaReducer", () => {
  test("should update an entity ", () => {
    const state = schemaReducer(
      {},
      updateEntity({
        game: {
          "game-slug": { slug: "game-slug", foo: "bar" },
        },
      })
    );

    expect(state).toMatchObject({
      game: {
        "game-slug": {
          slug: "game-slug",
          foo: "bar",
        },
      },
    });
  });

  test("should merge entities and keep original state key", () => {
    const initialState = { game: { foo: { slug: "foo", bar: 1, baz: 3 } } };
    const state = schemaReducer(
      initialState,
      updateEntity({ game: { foo: { slug: "foo", bar: 2 } } })
    );

    expect(state).toMatchObject({
      game: { foo: { slug: "foo", bar: 2, baz: 3 } },
    });
  });

  test("should merge entities and remove original state key", () => {
    const initialState = { game: { foo: { slug: "foo", bar: 1, baz: 3 } } };
    const state = schemaReducer(
      initialState,
      updateEntity({ game: { foo: { slug: "foo", bar: 2, baz: null } } })
    );

    expect(state).toMatchObject({
      game: { foo: { slug: "foo", bar: 2 } },
    });
  });

  test("should merge multiple entities", () => {
    const initialState = {
      game: { foo: { slug: "foo", bar: 1 } },
      liveTable: {
        fooId: { tableId: "fooId", foo: "bar" },
        barId: { tableId: "barId", foo: "bar" },
      },
    };

    const state = schemaReducer(
      initialState,
      updateEntity({
        game: { foo: { slug: "foo", bar: 2 } },
        liveTable: { barId: { tableId: "barId", foo: "bar2" } },
      })
    );

    expect(state).toMatchObject({
      game: { foo: { slug: "foo", bar: 2 } },
      liveTable: {
        fooId: { tableId: "fooId", foo: "bar" },
        barId: { tableId: "barId", foo: "bar2" },
      },
    });
  });
});
