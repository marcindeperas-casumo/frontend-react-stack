# Mocking in Storybook

### Problem

You might find yourself in the situation where you write nice encapsulation
for the logic you need in your component (_cough_ ...hooks... _cough_),
but mocking it will be really hard. You might need really big chunk of the state
or something expensive being available in the context.

### Solution

There's easy way to bypass that, for your `/sample.js` file you can create file
`/sample.mock.js` or `/__mocks__/sample.js` that will be used instead. It can be
as simple as just returning object that would be returned after all computations.

### Known issues

Because of how module resolution works in watch mode you might encounter error

> ENOENT: no such file or directory

It happens when you remove file with your mock (because you expect webpack to
be smart and resolve back to your normal file).

Similarly if you create mock file that wasn't existing before running `yarn dev`
it'll be ignored until next compilation.

**Restarting dev server will fix both issues**

This issue will be fixed in webpack 5
(see: https://github.com/webpack/webpack/issues/6036#issuecomment-464355189)
