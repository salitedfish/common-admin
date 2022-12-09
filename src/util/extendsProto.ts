declare global {
  interface Array<T> {
    getItem: <P>(value: P) => T | undefined;
  }
}

Object.defineProperty(Array.prototype, "getItem", {
  value: function (value: unknown) {
    for (const item of this) {
      if (item.value === value) {
        return item;
      }
    }
  },
  enumerable: false,
});
export {};
