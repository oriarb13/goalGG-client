import { atom } from "recoil";

export const loadgingState = atom({
  key: "loadgingState", // unique ID (with respect to other atoms/selectors)
  default: { state: false, label: "" },
});
