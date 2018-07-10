import getTopList from "./getTopList";
import { queryHandshake } from "./api";

jest.mock("./api");

test("should return top list", async () => {
  const topList = await getTopList({
    handshakePromise: queryHandshake(),
    id: "liveCasino",
    variant: "default",
  });
  console.log({ topList });

  expect(topList).toMatchObject({
    title: "Live Casino",
  });
});
