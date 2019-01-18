# Contributing Guidelines

Here are some high level recommendations on how to best contribute to the project.

## PRs

- Require 2 reviews.
- Will be rejected without any [tests](Test strategy).
- Visual Regression tests should be checked [here](https://www.chromaticqa.com/builds?appId=5b9fa923b6b01b00248452c7).(Oauth with github if need be.)
- Should be kept as small as possible. E.g create PRs for single components rather than one large feature branch.

## Components

Before you create a component please consider the following steps:

- Check [CUDL React](http://cudl-react.at.casumotest.local:8080) in case there is a component you can reuse.
- Check Storybook in this repo in case there is a component you can reuse.
- Creating a new component should be done with `yarn generate-component <component_name>` to give a [good starting point](#folder-structure)
- Refer to the relevant design file and/or liase with a designer to give the component a descriptive name.
- Avoid writing custom styling in favour of using CUDL utility classes (Colors, Typography, Spacings etc). If in doubt talk to a designer to understand the components' specification.
- If component styling is required Sass files should live inside the component's folder.
- Be mindful when using state within a component. Stateless components FTW!
- Consider keeping component APIs to a minimum. If your component API is large it's a good indication that it is trying to do too much and/or should be separated out.
- Containers should live in the same folder as the component it wraps.
- Every component that isn't a) exclusively an inner component of another (read: not re-usable) or b) a Container should be a top level component.
- Test files (tests or stories) should live alongside the components it tests.

## Folder structure

```bash
|-- src
    |-- components
        |-- MyComponent
            |-- index.js
            |-- MyComponent.js
            |-- MyComponent.scss
            |-- MyComponent.stories.js
            |-- MyComponent.test.js
            |-- MyComponentContainer.js
            |-- MyComponentContainer.test.js
            |-- MyComponentInnerComponent.js
        |-- MyOtherComponent
    |-- 🥔
        |-- cms
            |-- index.js
            |-- cms.actions.js
            |-- cms.actions.test.js
            |-- cms.constants.js
            |-- cms.sagas.js
            |-- cms.sagas.test.js
            |-- cms.selectors.js
            |-- cms.selectors.test.js
        |-- other-model-domain
```

## Test strategy

Consider the following piece of code:

```javascript
export default class MyComponent extends PureComponent<Props> {
  render() {
    return isA ? <ComponentA /> : <ComponentB />;
  }
}
```

Before thinking about which tools to use, think about what we should be testing.

In this example, we need to make sure `MyComponent` renders `<ComponentA />` when `isA` is `true` and `<ComponentB />` when `isA` is `false`.

This can be done by writing [Stories](https://github.com/storybooks/storybook) or through [Enzyme](https://github.com/airbnb/enzyme)'s DOM inspection.

Stories are better suited for Presentational components, especially as they are integrated with [Chromatic](https://www.chromaticqa.com/) to form a visual regression layer.

_**All reusable components should have stories to facilitate component discovery in storybooks!**_

Enzyme is great at testing logic heavy components as it can manipulate the component's state with ease.

Often times, a combination of the tools we have available will result in the best outcome.

The same principles apply to Services, Reducers, Sagas and so on although, as they aren't components, [Jest](https://jestjs.io/) works best in those cases.

The takeaway here is to think about the different paths your application can take and the various cases they form, then write tests to cover them all!

TDD is heavily encouraged!

_**Note: If you are adding a new key user journey, make sure to also add tests to our [smoke test project](https://github.com/Casumo/smoke-tests)!!**_

## Flow

Use flow _all the time_. 😳

## Commenting code

When adding comments to a piece of code, try to explain _why_ that code is needed and not how it works.

If the _how_ is hard to understand, that is probably because the code isn't written as well as it could be.

Writing tests is an even better way of documenting your code!

## Submitting Pull Requests

Please abide by the Pull Request template!
