import { HTMLAttributes, ReactNode } from 'react';
import { atom } from 'recoil';

interface IContent {
  header?: React.ReactNode;
  title?: string;
  filters?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface IDefaultData {
  show: boolean;
  newVersion?: boolean;
  content: IContent | any;
  state?: any;
  drawerProps?: any;
  anchor?: string;
  isModal?: boolean;
}

const defaultDrawerData: IDefaultData = {
  show: false,
  newVersion: false,
  content: {},
  drawerProps: {},
  isModal: false,
};
export const drawerState = atom({
  key: 'drawerState', // unique ID (with respect to other atoms/selectors)
  default: defaultDrawerData,
});
