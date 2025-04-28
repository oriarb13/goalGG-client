import {
  AccountStatusEnum,
  ClubStatusEnum,
  SportCategoryEnum,
  StrongSideEnum,
} from "./enums";

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
  maxClubs: number;
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
  clubs: string[];
  clubsRequests: string[];
  totalStats: TotalStats;
  subscriptions: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClub {
  _id: string;
  name: string;
  description?: string;
  admin: string;
  captains?: string[];
  members?: {
    userId: string;
    skillRating?: number;
    positions?: string[];
    goals?: number;
    assists?: number;
    points?: number;
    matchesCount?: number;
  }[];
  pendingRequests?: { userId: string; role: string }[];
  sportCategory?: SportCategoryEnum;
  image?: string;
  status?: ClubStatusEnum;
  isPrivet?: boolean;
  maxPlayers?: number;
  location?: {
    country?: string;
    city?: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
