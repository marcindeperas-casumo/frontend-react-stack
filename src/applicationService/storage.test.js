import storageLib from "Lib/storage";
import storageService, { NAMESPACE } from "./storage";

jest.mock("../lib/storage");

describe("Services/Storage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test(".get() proxies with the correct namespace", () => {
    const key = "key-1";
    const defaultValue = "defaultvalue-1";

    storageService.get(key, defaultValue);

    expect(storageLib.get).toHaveBeenCalledTimes(1);
    expect(storageLib.get).toHaveBeenCalledWith(key, defaultValue, NAMESPACE);
  });

  test(".set() proxies with the correct namespace", () => {
    const key = "key-1";
    const value = "defaultvalue-1";

    storageService.set(key, value);

    expect(storageLib.set).toHaveBeenCalledTimes(1);
    expect(storageLib.set).toHaveBeenCalledWith(key, value, NAMESPACE);
  });

  test(".remove() proxies with the correct namespace", () => {
    const key = "key-1";

    storageService.remove(key);

    expect(storageLib.remove).toHaveBeenCalledTimes(1);
    expect(storageLib.remove).toHaveBeenCalledWith(key, NAMESPACE);
  });
});
