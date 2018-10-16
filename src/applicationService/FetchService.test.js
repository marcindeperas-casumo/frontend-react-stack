import { commonFetch } from "Utils/utils";
import { fetchService } from "Services/FetchService";

jest.mock("../utils/utils");

test("calls commonFetch", () => {
  const method = "POST";
  const url = "https://example.com";
  const data = { foo: "bar" };

  fetchService({ method, url, data });

  expect(commonFetch).toBeCalledTimes(1);
  expect(commonFetch).toHaveBeenCalledWith(url, { method, ...data });
});
