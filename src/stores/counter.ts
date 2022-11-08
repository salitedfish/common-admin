import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = 1;
  return {
    count,
  };
});
