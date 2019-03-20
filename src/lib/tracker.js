// @flow

const callAdapters = (
  adapters: Array<Object>,
  methodName: string,
  ...args: Array<any>
) => adapters.forEach(adapter => adapter[methodName](...args));

export default function tracker(adapters: Array<Object> = []) {
  // A state is something that is persisted for a session on the client device
  // and is sent along with all tracked events.
  const setState = (data: Object) => callAdapters(adapters, "setState", data);
  const track = (event: string, data: Object) =>
    callAdapters(adapters, "track", event, data);

  return {
    track,
    setState,
  };
}
