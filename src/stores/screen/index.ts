import { atom } from "recoil";

interface IDefualtData {
  width?: number | undefined;
  height?: number | undefined;
  isMobile: boolean;
  isGetData: boolean;
}
const defaultData: IDefualtData = {
  width: 0,
  height: 0,
  isMobile: false,
  isGetData: false,
};
export const screenState = atom({
  key: "screenState", // unique ID (with respect to other atoms/selectors)
  default: defaultData,
});
