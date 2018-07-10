import getTopListIds from "./getTopListIds";

test("should return a reject promise if it does receive a promise ", async () => {
  expect.assertions(1);
  try {
    await getTopListIds();
  } catch (e) {
    expect(e).toEqual(new TypeError("Expected promise"));
  }
});

test("should return the top list ids from the handshake", async () => {
  const expectedValue = ["id-1", "id-2"];

  const actualValue = await getTopListIds(
    Promise.resolve({
      topListIds: ["id-1", "id-2"],
    })
  );

  expect(actualValue).toEqual(expectedValue);
});
