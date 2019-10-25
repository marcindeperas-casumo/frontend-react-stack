import React from "react";
import wait from "waait";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { withContainer } from "Components/Settings/SettingsRealityCheck/SettingsRealityCheckContainer";
import {
  withMockQueries,
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

let Component, SettingsRealityCheckContainer;
describe("SettingsRealityCheckContainer", () => {
  describe("Component", () => {
    beforeEach(() => {
      Component = props => <div />;
      SettingsRealityCheckContainer = withContainer(Component);
    });

    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerRealityCheckQueryMock, realityCheckLabelsQueryMock]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should pass correct initial interval to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerRealityCheckQueryMock, realityCheckLabelsQueryMock]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("Component").prop("interval")).toStrictEqual(
        playerRealityCheckQueryMock.result.data.player.playOk.realityCheck
          .intervalInMinutes
      );
    });

    test("should pass correct labels to children", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerRealityCheckQueryMock, realityCheckLabelsQueryMock]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(realityCheckLabelsQueryMock.result.data);
    });

    test("should show error when settings fail to load", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[
            playerRealityCheckQueryErrorMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );

      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should show error when labels fail to load", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryErrorMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );

      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });
  });

  describe("Actions", () => {
    test("should change interval when onChange is triggered in child", async () => {
      Component = props => (
        <input type="button" onClick={() => props.onChange(30)} />
      );
      SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(updateRealityCheckIntervalMock)}>
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(30);
    });

    test("shouldn't call mutation when canChangeInterval is false", async () => {
      Component = props => (
        <>
          <input type="button" onClick={() => props.onChange(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryCantChangeIntervalMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered
        .find("Component")
        .childAt(0)
        .simulate("click");
      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");

      const result = await promiseFn();
      expect(result).toBe(undefined);
    });

    test("shouldn't call mutation when interval is 0 and isZeroIntervalAllowed is false", async () => {
      Component = props => (
        <>
          <input type="button" onClick={() => props.onChange(0)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryNoZeroIntervalMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered
        .find("Component")
        .childAt(0)
        .simulate("click");
      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(0);

      const promiseFn = rendered.find("Component").prop("onSave");

      const result = await promiseFn();
      expect(result).toBe(undefined);
    });

    test("should call mutation when onSave is triggered in child", async () => {
      //eslint-disable-next-line sonarjs/no-identical-functions
      Component = props => (
        <>
          <input type="button" onClick={() => props.onChange(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...withMockQueries(updateRealityCheckIntervalMock),
            playerRealityCheckQueryMock,
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered
        .find("Component")
        .childAt(0)
        .simulate("click");
      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");

      const {
        data: { updateRealityCheckInterval },
      } = await promiseFn();
      expect(updateRealityCheckInterval).toBe(10 * 60);
    });

    test("after successful mutation, state should be refetched", async () => {
      //eslint-disable-next-line sonarjs/no-identical-functions
      Component = props => (
        <>
          <input type="button" onClick={() => props.onChange(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...withMockQueries(updateRealityCheckIntervalMock),
            playerRealityCheckQueryWithInterval(45),
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered
        .find("Component")
        .childAt(0)
        .simulate("click");
      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");

      const {
        data: { updateRealityCheckInterval },
      } = await promiseFn();
      expect(updateRealityCheckInterval).toBe(10 * 60);

      await wait(10);
      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(45);
    });

    test.skip("after unsuccessful mutation, state should be refetched", async () => {
      //eslint-disable-next-line sonarjs/no-identical-functions
      Component = props => (
        <>
          <input type="button" onClick={() => props.onChange(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      SettingsRealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
            ...updateRealityCheckIntervalErrorMock,
            playerRealityCheckQueryWithInterval(45),
          ]}
        >
          <SettingsRealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered
        .find("Component")
        .childAt(0)
        .simulate("click");
      rendered.update();
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");
      await promiseFn();
      await wait(0);
      expect(
        rendered.find("SettingsRealityCheckContainer").state("intervalMinutes")
      ).toBe(45);
    });
  });
});
