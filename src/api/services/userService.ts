import axiosInstance from "../axios";
import { User } from "@/types/types";
import { API_ENDPOINTS, LoginRequest } from "../types";
import {
  AuthResponse,
  UserResponse,
  UsersResponse,
  PaginatedResponse,
  RegisterUserRequest,
  UpdateUserRequest,
  DeleteResponse,
  SubscriptionUpdateResponse,
} from "../types";

export const userService = {
  // Auth endpoints
  register: async (userData: RegisterUserRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  },

  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    console.log(response);

    return response.data;
  },

  getConnectedUser: async (): Promise<UserResponse> => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.AUTH.GET_CONNECTED_USER
    );
    return response.data;
  },

  // User endpoints
  getUsers: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.USERS.GET_ALL}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getUserById: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  updateUser: async (
    id: string,
    userData: UpdateUserRequest
  ): Promise<UserResponse> => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.USERS.UPDATE(id),
      userData
    );
    return response.data;
  },

  deleteUser: async (id: string): Promise<DeleteResponse> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.USERS.DELETE(id));
    return response.data;
  },

  getUsersByGroup: async (groupId: string): Promise<UsersResponse> => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.USERS.BY_GROUP(groupId)
    );
    return response.data;
  },

  getUsersByEvent: async (eventId: string): Promise<UsersResponse> => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.USERS.BY_EVENT(eventId)
    );
    return response.data;
  },

  changeSubscription: async (
    subscriptionId: string
  ): Promise<SubscriptionUpdateResponse> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.USERS.CHANGE_SUBSCRIPTION(subscriptionId)
    );
    return response.data;
  },
};

export default userService;
