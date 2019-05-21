import React from "react";
import wait from "waait";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { withContainer } from "./SectionsContainer";
import {
  playerSectionsQueryMock,
  playerSectionsLabelsQueryMock,
  playerSectionsQueryErrorMock,
  playerSectionsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

let Component, SectionsContainer;
describe("AccountDetails", () => {
  describe("Player Settings", () => {
    beforeEach(() => {
      Component = props => <div />;
      SectionsContainer = () => withContainer(Component);
    });

    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SectionsContainer />
        </MockedProvider>
      );

      expect(rendered.find("RowListSkeleton")).toHaveLength(1);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsLabelsQueryMock, playerSectionsQueryErrorMock]}
        >
          <SectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(
          JSON.stringify(rendered.find("Component").prop("playerQuery"))
        )
      ).toStrictEqual(playerSectionsQueryMock.result.data);
    });
  });

  describe("Labels", () => {
    beforeEach(() => {
      Component = props => <div />;
      SectionsContainer = () => withContainer(Component);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsLabelsQueryErrorMock, playerSectionsQueryMock]}
        >
          <SectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    });
  });
});
