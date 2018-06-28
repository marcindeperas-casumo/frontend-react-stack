import { composePromises, compose, trace } from "../../utils";

const g = x => x.toUpperCase();
const f = x => x.split("");

test("Simple composition", () => {
  const main = compose(
    f,
    g
  );

  expect(main("luke")).toEqual(["L", "U", "K", "E"]);
});

test("Promise composition", async () => {
  const api = () => Promise.resolve("luke");

  const main = composePromises(f, g);

  expect(await main(api())).toEqual(["L", "U", "K", "E"]);
});

test("arguments", () => {
  const doubleA = x => [x, x];
  const id = x => x;

  const fn = ({ v1, v2 }) => {
    return {
      a: doubleA(v1),
      b: id(v2)
    };
  };

  const main = compose(
    ([a, b]) => ({ a, b }),
    x =>
      [doubleA, id].reduce((acc, curr, i) => {
        acc.push(curr(x[i]));
        return acc;
      }, []),
    ({ v1, v2 }) => [v1, v2]
  );

  expect(main({ v1: 1, v2: 2 })).toEqual({ a: [1, 1], b: 2 });
});
