import { StrongSideEnum, UserRoleEnum } from "@/types/enums";
import { SportCategoryEnum } from "@/types/enums";
import { Phone, User } from "@/types/types";

// Request Types
export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: Phone;
  sportCategory: SportCategoryEnum;
  yearOfBirth: number;
  country?: string;
  city?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  image?: string;
  positions?: string[];
  sportCategory?: SportCategoryEnum;
  yearOfBirth?: number;
  cm?: number;
  kg?: number;
  strongSide?: StrongSideEnum;
  email?: string;
  phone?: Phone;
  country?: string;
  city?: string;
  location?: Location;
}

// Response Types
export interface AuthResponse {
  success: boolean;
  data: {
    _id: string;
    fullName: string;
    email: string;
    phone: Phone;
    role: UserRoleEnum;
    sportCategory: SportCategoryEnum;
    token: string;
  };
}

export interface UserResponse {
  success: boolean;
  data: User;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  data: User[];
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface SubscriptionUpdateResponse {
  success: boolean;
  message: string;
  data: User;
}

// Pagination
export interface PaginatedResponse<T> {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  data: T[];
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    GET_CONNECTED_USER: "/users/getConnectedUser",
  },
  USERS: {
    BASE: "/users",
    GET_ALL: "/users/getAllUsers",
    BY_ID: (id: string) => `/users/getById/${id}`,
    UPDATE: (id: string) => `/users/updateConnectedUser/${id}`,
    DELETE: (id: string) => `/users/delete/${id}`,
    BY_GROUP: (groupId: string) => `/users/byGroup/${groupId}`,
    BY_EVENT: (eventId: string) => `/users/byEvent/${eventId}`,
    CHANGE_SUBSCRIPTION: (subscriptionId: string) =>
      `/users/changeSubscription/${subscriptionId}`,
  },
  // You can add more endpoints for Group, Event, etc. here
};
