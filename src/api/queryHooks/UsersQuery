import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import userService from "../services/userService";
import { RegisterUserRequest, UpdateUserRequest } from "../types";

export const USERS_QUERY_KEYS = {
  all: ["users"] as const,
  lists: () => [...USERS_QUERY_KEYS.all, "list"] as const,
  list: (filters: any) => [...USERS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...USERS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...USERS_QUERY_KEYS.details(), id] as const,
  connected: () => [...USERS_QUERY_KEYS.all, "connected"] as const,
  byGroup: (groupId: string) =>
    [...USERS_QUERY_KEYS.lists(), "group", groupId] as const,
  byEvent: (eventId: string) =>
    [...USERS_QUERY_KEYS.lists(), "event", eventId] as const,
};

// Auth hooks
export function useRegister() {
  return useMutation({
    mutationFn: (userData: RegisterUserRequest) =>
      userService.register(userData),
    onSuccess: (data) => {
      if (data.success && data.data.token) {
        // Save token to localStorage upon successful registration
        localStorage.setItem("token", data.data.token);
      }
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      userService.login(credentials),
    onSuccess: (data) => {
      if (data.success && data.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", data.data.token);
        // Invalidate and refetch connected user
        queryClient.invalidateQueries({
          queryKey: USERS_QUERY_KEYS.connected(),
        });
      }
    },
  });
}

export function useConnectedUser() {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.connected(),
    queryFn: () => userService.getConnectedUser(),
    retry: false,
    // Only fetch if we have a token
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
}

// User list hooks
export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.list({ page, limit }),
    queryFn: () => userService.getUsers(page, limit),
  });
}

// export function useInfiniteUsers(limit = 10) {
//   return useInfiniteQuery({
//     queryKey: USERS_QUERY_KEYS.lists(),
//     queryFn: ({ pageParam = 1 }) => userService.getUsers(pageParam, limit),
//     getNextPageParam: (lastPage) => {
//       if (!lastPage.success) return undefined;
//       const hasNextPage = lastPage.page * lastPage.limit < lastPage.total;
//       return hasNextPage ? lastPage.page + 1 : undefined;
//     },
//   });
// }

// User detail hook
export function useUser(id: string) {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // Only run if ID exists
  });
}

// User groups hooks
export function useUsersByGroup(groupId: string) {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.byGroup(groupId),
    queryFn: () => userService.getUsersByGroup(groupId),
    enabled: !!groupId,
  });
}

export function useUsersByEvent(eventId: string) {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.byEvent(eventId),
    queryFn: () => userService.getUsersByEvent(eventId),
    enabled: !!eventId,
  });
}

// Mutation hooks
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userService.updateUser(id, data),
    onSuccess: (data, variables) => {
      if (!data.success) return;

      // Update specific user in cache
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.detail(variables.id),
      });

      // If updating the connected user, also refetch that
      const connectedUser = queryClient.getQueryData(
        USERS_QUERY_KEYS.connected()
      );
      if (connectedUser && (connectedUser as any).data?._id === variables.id) {
        queryClient.invalidateQueries({
          queryKey: USERS_QUERY_KEYS.connected(),
        });
      }

      // Also refetch the list
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.lists(),
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: (data, id) => {
      if (!data.success) return;

      // Remove from cache
      queryClient.removeQueries({ queryKey: USERS_QUERY_KEYS.detail(id) });
      // Refetch the list
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.lists() });
    },
  });
}

export function useChangeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) =>
      userService.changeSubscription(subscriptionId),
    onSuccess: (data) => {
      if (!data.success) return;

      // Refetch connected user to get updated subscription info
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.connected() });
    },
  });
}
