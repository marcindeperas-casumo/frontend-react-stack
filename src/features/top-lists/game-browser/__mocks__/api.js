import mockHandshakeRequest from "./mockHandshakeRequest";

export const queryHandshake = mockHandshakeRequest;
export const queryTopList = id =>
  Promise.resolve({ title: "Title Id 1", games: ["g1"] });
