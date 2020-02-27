describe("SettingsSections", () => {
  // TODO PCC-469

  // beforeEach(() => {
  //   Component = props => <div />;
  //   SettingsSectionsContainer = () => withContainer(Component);
  // });

  describe("Player Settings", () => {
    test("TESTS COMMENTED OUT - PCC-469 - REMOVE REACT-ADOPT AND REWRITE COMPONENTS/TESTS", () => {});
    //   test("should render loader", async () => {
    //     const rendered = mount(
    //       <MockedProvider
    //         mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
    //       >
    //         <SettingsSectionsContainer />
    //       </MockedProvider>
    //     );

    //     expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);

    //     await waitAndUpdateWrapper(rendered);
    //   });

    //   test("should show error", async () => {
    //     const rendered = mount(
    //       <MockedProvider
    //         mocks={[playerSectionsQueryErrorMock, playerSectionsLabelsQueryMock]}
    //       >
    //         <SettingsSectionsContainer />
    //       </MockedProvider>
    //     );

    //     await waitAndUpdateWrapper(rendered);

    //     expect(rendered.find("ErrorMessage")).toHaveLength(1);
    //   });

    //   test("should pass correct player to child", async () => {
    //     const rendered = mount(
    //       <MockedProvider
    //         mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
    //       >
    //         <SettingsSectionsContainer />
    //       </MockedProvider>
    //     );

    //     await waitAndUpdateWrapper(rendered);

    //     expect(
    //       rendered.find("Component").prop("playerLoginHistory")
    //     ).toStrictEqual(playerSectionsQueryMock.result.data);
    //   });
    // });

    // describe("Labels", () => {
    //   test("should show error", async () => {
    //     const rendered = mount(
    //       <MockedProvider
    //         mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryErrorMock]}
    //       >
    //         <SettingsSectionsContainer />
    //       </MockedProvider>
    //     );

    //     await waitAndUpdateWrapper(rendered);

    //     expect(rendered.find("ErrorMessage")).toHaveLength(1);
    //   });

    //   test("should pass correct player to child", async () => {
    //     const rendered = mount(
    //       <MockedProvider
    //         mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
    //       >
    //         <SettingsSectionsContainer />
    //       </MockedProvider>
    //     );

    //     await waitAndUpdateWrapper(rendered);

    //     expect(
    //       JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
    //     ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    //   });
  });
});
