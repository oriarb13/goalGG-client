import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useUser() {
  const user = useSelector((state: RootState) => state.user.user);

  return {
    user,
    userDoc: user
      ? {
          isSuperAdmin: user.email?.endsWith("@goal-gg.com"),
          ...user,
        }
      : null,
  };
}
