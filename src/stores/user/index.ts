import { atom } from 'recoil';

interface Service {
  id: string;
}

interface Location {
  lng: number;
  lat: number;
}

interface ServiceProvider {
  displayName: string;
  logoImageFileName: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  services: Service[];
  groups: string[];
  location: Location;
  id: string;
  membersLimitation: number;
  categories: any[];
}

interface UserPermission {
  viewAllOnMap: boolean;
}

export interface IDefualtData {
  displayName: string;
  email: string;
  phoneNumber: string;
  uid: string;
  customClaims: {
    serviceProvider: {
      id: string;
      role: string;
    };
  };
  userDoc: {
    isSuperAdmin: boolean;
  };
  serviceProvider?: ServiceProvider;
  permissions?: UserPermission;
  photoURL: string;
}

export const defaultUserData: IDefualtData = {
  displayName: '',
  email: '',
  phoneNumber: '',
  uid: '',
  customClaims: {
    serviceProvider: {
      id: '',
      role: '',
    },
  },
  userDoc: {
    isSuperAdmin: false,
  },
  permissions: {
    viewAllOnMap: false,
  },
  photoURL: '',
};
export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: defaultUserData,
});
