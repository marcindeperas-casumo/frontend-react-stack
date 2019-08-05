// @flow
import { InMemoryCache } from "apollo-cache-inmemory";
import { MODAL } from "Features/sports/components/Modals";
import resolvers from "./resolvers";
import * as queries from "./queries";

const mockReadQuery = jest.fn();
const mockWriteQuery = jest.fn();
const mockWriteData = jest.fn();

jest.mock("apollo-cache-inmemory");

InMemoryCache.mockImplementation(() => ({
  readQuery: mockReadQuery,
  writeQuery: mockWriteQuery,
  writeData: mockWriteData,
}));

describe("Client state resolvers", () => {
  describe("Mutation.openModal", () => {
    beforeEach(() => {});

    test("appends the modal to the list of active modals", () => {
      const modal1: Modal = MODAL.CHOOSE_FAVOURITES;
      const modal2: Modal = MODAL.CHOOSE_FAVOURITE_COMPETITIONS;
      const cache = new InMemoryCache();

      mockReadQuery
        .mockImplementationOnce(() => ({ activeModals: [] }))
        .mockImplementationOnce(() => ({ activeModals: [modal1] }));

      resolvers.Mutation.openModal(null, { modal: modal1 }, { cache });
      resolvers.Mutation.openModal(null, { modal: modal2 }, { cache });

      expect(mockReadQuery).toHaveBeenCalledWith({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(mockWriteQuery).toHaveBeenNthCalledWith(1, {
        query: queries.ACTIVE_MODALS_QUERY,
        data: { activeModals: [modal1] },
      });

      expect(mockWriteQuery).toHaveBeenNthCalledWith(2, {
        query: queries.ACTIVE_MODALS_QUERY,
        data: { activeModals: [modal1, modal2] },
      });
    });
  });
});
