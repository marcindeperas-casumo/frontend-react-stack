import mockHandshakeRequest from "./mockHandshakeRequest";

export default {
  queryHandshake: mockHandshakeRequest,
  queryTopList: id => Promise.resolve({ title: "Title Id 1", games: ["g1"] })
};
