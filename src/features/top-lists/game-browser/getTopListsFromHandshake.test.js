import getTopListsFromHandshake from "./getTopListsFromHandshake";

test("should return a reject promise if it does receive a promise ", async () => {
  expect.assertions(1);
  try {
    await getTopListsFromHandshake();
  } catch (e) {
    expect(e).toEqual(new TypeError("Expected promise"));
  }
});

test("should return top lists from handshake", async () => {
  const topLists = await getTopListsFromHandshake(
    Promise.resolve({
      topListIds: ["id-1"],
      gamesLists: {
        "id-1": {
          id: "id-1",
          title: "title id 1",
          image: "",
          variants: {},
        },
        "id-2": {
          id: "id-1",
          title: "title id 1",
          image: "",
          variants: {},
        },
      },
    })
  );

  expect(topLists).toMatchObject([
    {
      id: "id-1",
      title: "title id 1",
      image: "",
      variants: {},
    },
  ]);
});
