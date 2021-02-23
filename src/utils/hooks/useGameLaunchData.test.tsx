// @flow
import * as React from "react";
import { mount } from "enzyme";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { DEVICES } from "Src/constants";
import { HookWrapper } from "Utils/HookWrapper";
import { ThunderkickGame } from "GameProviders";
import MockStore from "Components/MockStore";
import { useGameLaunchData } from "./useGameLaunchData";

const responseData = {
  providedSession: {
    parameters: {
      providerName: "THUNDERKICK",
      providerType: "THUNDERKICK_MOBILE",
      url: "https://gameurl.test.com",
    },
  },
};

describe("useGameLaunchData", () => {
  beforeEach(function() {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ responseData }),
      })
    );
  });
  afterEach(function() {
    global.fetch.mockClear();
    // eslint-disable-next-line fp/no-delete
    delete global.fetch;
  });

  // FixMe - this test should not be skipped, but it is quite flaky atm so it often breaks the CI
  test.skip("returns gameProvider model", async () => {
    const wrapper = mount(
      <MockStore>
        <HookWrapper
          hook={useGameLaunchData}
          args={[
            {
              slug: "fruit-warp",
              playForFun: true,
              platform: DEVICES.MOBILE,
              language: "en",
            },
          ]}
        />
      </MockStore>
    );

    await waitAndUpdateWrapper(wrapper);

    const { gameProviderModel } = wrapper.find("div").props().hook;

    expect(gameProviderModel).toBeInstanceOf(ThunderkickGame);
  });
});
