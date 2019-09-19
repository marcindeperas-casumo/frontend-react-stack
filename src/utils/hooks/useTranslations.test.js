// @flow
import * as React from "react";
import * as R from "ramda";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useTranslations } from "./useTranslations";
const cms = require("Models/cms/cms.actions");
cms.fetchPageBySlug = jest.fn();
cms.fetchPageBySlug.mockImplementation(() => ({ type: "mocked" }));

const slug = "slug.slug";
const translations = {
  a: "b",
  b: "c",
};
const state = {
  schema: {
    cms: {
      "slug.slug": { fields: translations },
    },
  },
};

describe("useTranslations", () => {
  describe("happy path", () => {
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useTranslations} args={[slug]} />
      </MockStore>
    );

    test("returns proper translations from cms", () => {
      expectHook(wrapper).toEqual(translations);
    });

    test("fetch page is called only once", () => {
      R.times(() => wrapper.update(), 13);
      expect(cms.fetchPageBySlug).nthCalledWith(1, slug);
      R.times(() => wrapper.update(), 21);
      expect(cms.fetchPageBySlug).nthCalledWith(1, slug);
    });
  });

  test("returns null if translation doesn't exist in redux", () => {
    const wrapper = mount(
      <MockStore state={{}}>
        <HookWrapper hook={useTranslations} args={[slug]} />
      </MockStore>
    );
    expectHook(wrapper).toEqual(null);
  });

  test("returns null if translation doesn't exist in redux", () => {
    const state2 = {
      schema: {
        cms: {
          "slug.slug": {
            fields: {
              ...translations,
              critical_for_compliance: "should be hidden",
              "": "should be hidden",
            },
          },
        },
      },
    };
    const wrapper = mount(
      <MockStore state={state2}>
        <HookWrapper hook={useTranslations} args={[slug]} />
      </MockStore>
    );
    expectHook(wrapper).toEqual(translations);
  });
});
