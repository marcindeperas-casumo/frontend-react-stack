import { mount } from "enzyme";
import { mapContentDefinitionToComponent } from "Components/ComponentBuilder/ComponentBuilder.utils";

describe("ComponentBuilder Utils", () => {
  describe("mapContentDefinitionToComponent()", () => {
    test("maps a content definition to a component", () => {
      const contentDefinition = {
        acf_fc_layout: "HTML_CONTENT",
        html: "<span>Foo.</span>",
      };
      const i = 1;
      const component = mapContentDefinitionToComponent(contentDefinition, i);
      const rendered = mount(component);

      expect(rendered.exists()).toBe(true);
      expect(rendered.find("DangerousHtml")).toHaveLength(1);
      expect(rendered.html()).toMatch("Foo");
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
