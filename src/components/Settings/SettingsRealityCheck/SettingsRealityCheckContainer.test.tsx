import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { ButtonPrimary } from "@casumo/cmp-button";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { PillSelector } from "Components/PillSelector";
import MockStore from "Components/MockStore";
import { SettingsRealityCheckContainer } from "./SettingsRealityCheckContainer";
import { SettingsRealityCheck } from "./SettingsRealityCheck";
import {
  playerRealityCheckQueryWithInterval,
  playerRealityCheckQueryCantChangeIntervalMock,
  playerRealityCheckQueryNoZeroIntervalMock,
  playerRealityCheckQueryMock,
  playerRealityCheckQueryErrorMock,
  realityCheckLabelsQueryMock,
  realityCheckLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";
import {
  updateRealityCheckIntervalMock,
  updateRealityCheckIntervalErrorMock,
} from "./__mocks__/Mutations.mock";

function actWithClickOnIntervalOption(rendered: ReactWrapper, index: number) {
  act(() => {
    rendered
      .find(PillSelector)
      .find(".c-input-pill")
      .at(index)
      .simulate("click");
  });
}

describe("SettingsRealityCheckContainer", () => {
  describe("Component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should render loader", () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should pass correct initial interval to child", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find(SettingsRealityCheck).prop("interval")
      ).toStrictEqual(
        playerRealityCheckQueryMock.result.data.player.playOk.realityCheck
          .intervalInMinutes
      );
    });

    test("should pass correct labels to children", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered, 10);

      expect(
        JSON.parse(
          JSON.stringify(rendered.find(SettingsRealityCheck).prop("labels"))
        )
      ).toStrictEqual(realityCheckLabelsQueryMock.result.data);
    });

    test("should show error when settings fail to load", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryErrorMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should show error when labels fail to load", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryErrorMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });
  });

  describe("Actions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("shouldn't call mutation when canChangeInterval is false", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryCantChangeIntervalMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      act(() => {
        rendered.find(PillSelector).childAt(0).simulate("click");
        rendered.find(ButtonPrimary).simulate("click");
      });

      await waitAndUpdateWrapper(rendered);

      expect(updateRealityCheckIntervalMock[0].result).toHaveBeenCalledTimes(0);
    });

    test("shouldn't call mutation when interval is 0 and isZeroIntervalAllowed is false", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryNoZeroIntervalMock,
            playerRealityCheckQueryNoZeroIntervalMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      act(() => {
        rendered.find(PillSelector).childAt(0).simulate("click");
        rendered.find(ButtonPrimary).simulate("click");
      });

      await waitAndUpdateWrapper(rendered);

      expect(updateRealityCheckIntervalMock[0].result).toHaveBeenCalledTimes(0);
    });

    test("should call mutation when onSave is triggered in child", async () => {
      // SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      act(() => {
        rendered
          .find(PillSelector)
          .find(".c-input-pill")
          .at(0)
          .simulate("click");
      });

      await waitAndUpdateWrapper(rendered);

      act(() => {
        rendered.find(ButtonPrimary).simulate("click");
      });

      await waitAndUpdateWrapper(rendered);

      expect(updateRealityCheckIntervalMock[1].result).toHaveBeenCalled();
    });

    test("after successful mutation, state should be refetched", async () => {
      const playerRealityCheckQueryResultFn = jest.fn();
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryWithInterval(
              10,
              playerRealityCheckQueryResultFn
            ),
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      actWithClickOnIntervalOption(rendered, 0);

      await waitAndUpdateWrapper(rendered);

      act(() => {
        rendered.find(ButtonPrimary).simulate("click");
      });
      await waitAndUpdateWrapper(rendered, 10);

      expect(updateRealityCheckIntervalMock[1].result).toHaveBeenCalled();
      expect(playerRealityCheckQueryResultFn).toHaveBeenCalled();
    });

    // TODO: this test is skipped due to it failing randomly in CI.
    test("after unsuccessful mutation, state should be refetched", async () => {
      const playerRealityCheckQueryResultFn = jest.fn();
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
            ...updateRealityCheckIntervalErrorMock,
            playerRealityCheckQueryWithInterval(
              45,
              playerRealityCheckQueryResultFn
            ),
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      actWithClickOnIntervalOption(rendered, 0);

      await waitAndUpdateWrapper(rendered);

      act(() => {
        rendered.find(ButtonPrimary).simulate("click");
      });

      await waitAndUpdateWrapper(rendered);

      expect(updateRealityCheckIntervalErrorMock[1].result).toHaveBeenCalled();

      await waitAndUpdateWrapper(rendered);

      expect(playerRealityCheckQueryResultFn).toHaveBeenCalled();
    });
  });
});
