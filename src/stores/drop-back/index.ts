import { atom } from "recoil";
export const dropBackState = atom({
  key: "dropBackState", // unique ID (with respect to other atoms/selectors)
  default: false
});
