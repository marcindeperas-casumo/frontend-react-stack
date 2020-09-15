// @flow
import { calculateProgress } from "./useCurrentReelRaceInfo";

describe("useCurrentReelRaceInfo", () => {
  describe("calculateProgress", () => {
    test("no start time", () => {
      expect(calculateProgress(null, 30, 5)).toEqual(0);
    });
    test("no end time", () => {
      expect(calculateProgress(10, null, 5)).toEqual(0);
    });
    test("no start and end time", () => {
      expect(calculateProgress(null, null, 5)).toEqual(0);
    });
    test("race not started yet", () => {
      expect(calculateProgress(10, 30, 5)).toEqual(0);
    });
    test("race is finshed just now", () => {
      expect(calculateProgress(10, 30, 30)).toEqual(1);
    });
    test("race is finshed some time ago", () => {
      expect(calculateProgress(10, 30, 40)).toEqual(1);
    });
    test("race is at 25% progress", () => {
      expect(calculateProgress(10, 30, 15)).toEqual(0.25);
    });
    test("race is at 50% progress", () => {
      expect(calculateProgress(10, 30, 20)).toEqual(0.5);
    });
    test("race is at 75% progress", () => {
      expect(calculateProgress(10, 30, 25)).toEqual(0.75);
    });
  });
  // dabeforeEach(() => {
  //   // $FlowIgnore
  //   getGameCategory.mockClear();
  // });

  // describe("no data in store", () => {
  //   test("fetch ta if nothing is saved in store", async () => {
  //     const wrapper = mount(
  //       <MockStore state={{}}>
  //         <HookWrapper hook={useGameCategory} args={[slug]} />
  //       </MockStore>
  //     );
  //     await waitAndUpdateWrapper(wrapper);

  //     expectHook(wrapper).toEqual({
  //       loading: false,
  //       gameCategory,
  //     });
  //   });

  //   test("request will be sent only once", async () => {
  //     const wrapper = mount(
  //       <MockStore state={{}}>
  //         <HookWrapper hook={useGameCategory} args={[slug]} />
  //       </MockStore>
  //     );

  //     // eslint-disable-next-line fp/no-loops
  //     for (let i = 0; i < 13; i++) {
  //       await waitAndUpdateWrapper(wrapper);
  //     }

  //     expect(getGameCategory).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe("data in store", () => {
  //   test("get data from store", () => {
  //     const wrapper = mount(
  //       <MockStore state={state}>
  //         <HookWrapper hook={useGameCategory} args={[slug]} />
  //       </MockStore>
  //     );

  //     expectHook(wrapper).toEqual({
  //       loading: false,
  //       gameCategory,
  //     });
  //   });

  //   test("request will be sent 0 times", async () => {
  //     const wrapper = mount(
  //       <MockStore state={state}>
  //         <HookWrapper hook={useGameCategory} args={[slug]} />
  //       </MockStore>
  //     );

  //     // eslint-disable-next-line fp/no-loops
  //     for (let i = 0; i < 13; i++) {
  //       await waitAndUpdateWrapper(wrapper);
  //     }

  //     expect(getGameCategory).toHaveBeenCalledTimes(0);
  //   });
  // });
});
