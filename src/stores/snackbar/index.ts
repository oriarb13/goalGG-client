import { atom } from 'recoil';

export interface IDefualtDataSnackBar {
  show: boolean;
  content: any;
  severity: 'error' | 'info' | 'success' | 'warning';
}

export const defaultData: IDefualtDataSnackBar = {
  show: false,
  content: {},
  severity: 'info',
};

export const snackbarState = atom({
  key: 'snackbarState', // unique ID (with respect to other atoms/selectors)
  default: defaultData,
});
