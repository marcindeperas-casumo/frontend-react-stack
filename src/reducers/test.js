export default function test(state = null, action) {
  switch (action.type) {
    case "TEST":
      return state;
    default:
      return state;
  }
}
