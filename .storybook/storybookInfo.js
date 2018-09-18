const info = options => ({
  info: {
    disable: navigator.userAgent.match(/Chromatic/),
    ...options,
  },
});

export default info;
