export default function polyfillWindowForChromatic() {
  if (!window.URL.createObjectURL) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.defineProperty(window.URL, "createObjectURL", { value: () => {} });
  }

  if (!window.URL.revokeObjectURL) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.defineProperty(window.URL, "revokeObjectURL", { value: () => {} });
  }
}
