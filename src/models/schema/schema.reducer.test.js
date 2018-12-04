import { types } from "./schema.constants";
import reducer from "./schema.reducer";
import { updateEntity } from "./schema.actions";

describe("Models/Schema/Reducer", () => {
  test("should update an entity ", () => {
    const state = reducer(
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

  test("should merge entities", () => {
    const initialState = { game: { foo: { slug: "foo", bar: 1 } } };
    const state = reducer(
      initialState,
      updateEntity({ game: { foo: { slug: "foo", bar: 2 } } })
    );

    expect(state).toMatchObject({ game: { foo: { slug: "foo", bar: 2 } } });
  });

  test("should merge multiple entities", () => {
    const initialState = {
      game: { foo: { slug: "foo", bar: 1 } },
      liveTable: {
        fooId: { tableId: "fooId", foo: "bar" },
        barId: { tableId: "barId", foo: "bar" },
      },
    };

    const state = reducer(
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
