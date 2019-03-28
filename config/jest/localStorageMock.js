const localStorageMock = (function() {
  // eslint-disable-next-line fp/no-let
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      // eslint-disable-next-line fp/no-mutation
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      // eslint-disable-next-line fp/no-mutation
      store = {};
    },
  };
})();
// eslint-disable-next-line fp/no-mutating-methods
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
