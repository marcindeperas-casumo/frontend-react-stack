export default () => {
  let handshake = {};

  const empty = () => {
    return !handshake.lastUpdated;
  };

  const update = newValue => {
    handshake = { ...newValue, lastUpdated: new Date().getTime() };
    return;
  };

  const value = () => {
    return handshake;
  };

  const invalidate = () => (handshake = {});

  return {
    empty,
    value,
    update,
    invalidate
  };
};
