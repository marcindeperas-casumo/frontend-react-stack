/* eslint-disable fp/no-let,fp/no-mutation,fp/no-mutating-methods,fp/no-delete */
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
/* eslint-enable fp/no-let,fp/no-mutation,fp/no-mutating-methods,fp/no-delete */
