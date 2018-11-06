import {
  mapContentDefinitionToComponent,
  COMPONENT_MAPPING,
} from "Components/ComponentBuilder/ComponentBuilder.utils";

describe("ComponentBuilder Utils", () => {
  describe("mapContentDefinitionToComponent()", () => {
    test("maps a content definition to a component", () => {
      const supportedComponents = Object.keys(COMPONENT_MAPPING);
      const getComponentName = c => c.displayName || c.name;

      supportedComponents.forEach((id, i) => {
        const contentDefinition = { acf_fc_layout: id };
        const component = mapContentDefinitionToComponent(contentDefinition, i);
        const originalComponent = COMPONENT_MAPPING[id];

        expect(getComponentName(component.type)).toEqual(
          getComponentName(originalComponent)
        );
      });
    });

    test("passes props to every component correctly", () => {
      const supportedComponents = Object.keys(COMPONENT_MAPPING);

      supportedComponents.forEach((id, i) => {
        const expectedProps = {
          prop1: `prop1-${i}`,
          prop2: `prop2-${i}`,
        };
        const contentDefinition = {
          acf_fc_layout: id,
          ...expectedProps,
        };
        const { props } = mapContentDefinitionToComponent(contentDefinition, i);

        expect(props).toEqual(expectedProps);
      });
    });

    test("returns null if the mapping does not exist", () => {
      const contentDefinition = {
        acf_fc_layout: "UNKNOWN_COMPONENT",
        foo: "bar",
      };
      const i = 1;
      const component = mapContentDefinitionToComponent(contentDefinition, i);

      expect(component).toBeNull();
    });
  });
});
