export default function polyfillWindowForChromatic() {
  if (!window.URL.createObjectURL) {
    Object.defineProperty(window.URL, "createObjectURL", { value: () => {} });
  }

  if (!window.URL.revokeObjectURL) {
    Object.defineProperty(window.URL, "revokeObjectURL", { value: () => {} });
  }
}