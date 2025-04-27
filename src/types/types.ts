import { AccountStatusEnum, SportCategoryEnum, StrongSideEnum } from "./enums";

import { UserRoleEnum } from "./enums";

export interface Phone {
  prefix: string;
  number: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface TotalStats {
  totalGames: number;
  totalPoints: number;
  totalAssists: number;
}

export interface Subscription {
  groupIds: string[];
  maxGroups: number;
  startDate?: Date;
  endDate?: Date;
  maxPlayers: number;
  cost: number;
  isActive: boolean;
}

export interface User {
  _id: string;
  role: UserRoleEnum;
  firstName: string;
  lastName: string;
  fullName: string; // Virtual field
  image: string;
  positions: string[];
  sportCategory: SportCategoryEnum;
  yearOfBirth: number;
  cm?: number;
  kg?: number;
  strongSide?: StrongSideEnum;
  avgSkillRating: number;
  email: string;
  isEmailVerified: boolean;
  phone: Phone;
  country?: string;
  city?: string;
  password?: string; // Not returned by API usually
  accountStatus: AccountStatusEnum;
  location?: Location;
  favoriteFields: string[];
  friends: string[];
  friendRequests: string[];
  groups: string[];
  groupsRequests: string[];
  totalStats: TotalStats;
  subscriptions: Subscription;
  createdAt: Date;
  updatedAt: Date;
}
