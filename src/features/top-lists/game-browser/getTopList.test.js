import getTopList from "./getTopList";
import api from "./api";

jest.mock("./api");

test("should return top list", async () => {
  const topList = await getTopList({
    handshakePromise: api.queryHandshake(),
    id: "liveCasino",
    variant: "default"
  });

  expect(topList).toMatchObject({
    title: "Live Casino"
  });
});
