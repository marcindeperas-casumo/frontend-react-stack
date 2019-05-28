import React from "react";
import wait from "waait";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { withContainer } from "Components/Settings/RealityCheck";
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

let Component, RealityCheckContainer;
describe("RealityCheck", () => {
  describe("Component", () => {
    beforeEach(() => {
      Component = props => <div />;
      RealityCheckContainer = withContainer(Component);
    });

    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerRealityCheckQueryMock, realityCheckLabelsQueryMock]}
        >
          <RealityCheckContainer />
        </MockedProvider>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should pass correct initial interval to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerRealityCheckQueryMock, realityCheckLabelsQueryMock]}
        >
          <RealityCheckContainer />
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
          <RealityCheckContainer />
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
          <RealityCheckContainer />
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
          <RealityCheckContainer />
        </MockedProvider>
      );

      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });
  });

  describe("Actions", () => {
    test("should change interval when onUpdate is triggered in child", async () => {
      Component = props => (
        <input type="button" onClick={() => props.onUpdate(30)} />
      );
      RealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(updateRealityCheckIntervalMock)}>
          <RealityCheckContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(30);
    });

    test("shouldn't call mutation when canChangeInterval is false", async () => {
      Component = props => (
        <>
          <input type="button" onClick={() => props.onUpdate(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      RealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryCantChangeIntervalMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <RealityCheckContainer />
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
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");

      const result = await promiseFn();
      expect(result).toBe(undefined);
    });

    test("shouldn't call mutation when is interval is 0 and isZeroIntervalAllowed is false", async () => {
      Component = props => (
        <>
          <input type="button" onClick={() => props.onUpdate(0)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      RealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...updateRealityCheckIntervalMock,
            playerRealityCheckQueryNoZeroIntervalMock,
            realityCheckLabelsQueryMock,
          ]}
        >
          <RealityCheckContainer />
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
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(0);

      const promiseFn = rendered.find("Component").prop("onSave");

      const result = await promiseFn();
      expect(result).toBe(undefined);
    });

    test("should call mutation when onSave is triggered in child", async () => {
      //eslint-disable-next-line sonarjs/no-identical-functions
      Component = props => (
        <>
          <input type="button" onClick={() => props.onUpdate(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      RealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...withMockQueries(updateRealityCheckIntervalMock),
            playerRealityCheckQueryMock,
          ]}
        >
          <RealityCheckContainer />
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
        rendered.find("RealityCheckContainer").state("intervalMinutes")
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
          <input type="button" onClick={() => props.onUpdate(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      RealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            ...withMockQueries(updateRealityCheckIntervalMock),
            playerRealityCheckQueryWithInterval(45),
          ]}
        >
          <RealityCheckContainer />
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
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");

      const {
        data: { updateRealityCheckInterval },
      } = await promiseFn();
      expect(updateRealityCheckInterval).toBe(10 * 60);

      await wait(10);
      rendered.update();
      expect(
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(45);
    });

    test("after unsuccessful mutation, state should be refetched", async () => {
      //eslint-disable-next-line sonarjs/no-identical-functions
      Component = props => (
        <>
          <input type="button" onClick={() => props.onUpdate(10)} />
          <input type="button" onClick={() => props.onSave()} />
        </>
      );
      RealityCheckContainer = withContainer(Component);
      const rendered = mount(
        <MockedProvider
          mocks={[
            playerRealityCheckQueryMock,
            realityCheckLabelsQueryMock,
            ...updateRealityCheckIntervalErrorMock,
            playerRealityCheckQueryWithInterval(45),
          ]}
        >
          <RealityCheckContainer />
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
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(10);

      const promiseFn = rendered.find("Component").prop("onSave");
      promiseFn();
      await wait(10);
      rendered.update();

      expect(
        rendered.find("Component").prop("updateError").graphQLErrors
      ).toEqual([{ foo: "bar" }]);
      await wait(10);
      rendered.update();
      expect(
        rendered.find("RealityCheckContainer").state("intervalMinutes")
      ).toBe(45);
    });
  });
});
