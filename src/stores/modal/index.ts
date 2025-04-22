import { atom } from "recoil";

interface IDefualtData {
  show: boolean;
  content: any;
  insideStyle?: any
  withClose?: any
}
const defaultData: IDefualtData = { withClose: true, show: false, content: {}, insideStyle: {} }
export const modalState = atom({
  key: "modalState", // unique ID (with respect to other atoms/selectors)
  default: defaultData
});
