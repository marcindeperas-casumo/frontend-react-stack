const api = {
  someCall: ({ param1, sessionParam1 }) => {
    const sessionParamReturn = `, and session param was: ${sessionParam1}`;
    return Promise.resolve({
      result:
        `Value for param1 was: ${param1}` +
        (sessionParam1 ? sessionParamReturn : "")
    });
  }
};

const sessionHolderFactory = () => {
  let session = {};

  const updateSession = newSession => {
    session = newSession;
    return;
  };

  const sessionParams = fn => {
    return fn(session);
  };

  return {
    sessionParams,
    updateSession
  };
};

describe.only("Testing an API idea", () => {
  test("simple api that accepts a session", async () => {
    const response = await api.someCall({ param1: "foo" });
    expect(response).toEqual({ result: "Value for param1 was: foo" });
  });

  test("should be able to accept a session param", async () => {
    const response = await api.someCall({
      param1: "foo",
      sessionParam1: "bar"
    });
    expect(response).toEqual({
      result: "Value for param1 was: foo, and session param was: bar"
    });
  });

  test("should be able to abstract session away", async () => {
    const sessionHolder = sessionHolderFactory();
    sessionHolder.updateSession({ bar: "bar" });

    const appendBar = x =>
      sessionHolder.sessionParams(s => ({
        sessionParam1: s.bar,
        ...x
      }));

    const response = await api.someCall(
      appendBar({
        param1: "foo"
      })
    );
    expect(response).toEqual({
      result: "Value for param1 was: foo, and session param was: bar"
    });

    sessionHolder.updateSession({ bar: "fizz" });
    const responseUpdated = await api.someCall(
      appendBar({
        param1: "foo"
      })
    );

    expect(responseUpdated).toEqual({
      result: "Value for param1 was: foo, and session param was: fizz"
    });
  });
});

describe.only("Client API ", () => {
  const clientAPIFactory = jest.fn();
  const appServiceFactory = jest.fn();

  let clientAPI;
  let appService;

  const getHandshakeMock = jest.fn();
  const getByIdMock = jest.fn();
  const getAllMock = jest.fn();

  beforeEach(() => {
    getHandshakeMock.mockReset();
    getByIdMock.mockReset();

    clientAPIFactory.mockImplementation(() => {
      return {
        getHandshake: getHandshakeMock,
        getById: getByIdMock
      };
    });

    clientAPI = clientAPIFactory();
    appServiceFactory.mockImplementation(() => {
      return {
        getAll: getAllMock
      };
    });

    appService = appServiceFactory();
  });

  test("should return handshake", async () => {
    getHandshakeMock.mockResolvedValue({ foo: "bar" });
    const response = await clientAPI.getHandshake();
    expect(response).toEqual({ foo: "bar" });
  });


});
