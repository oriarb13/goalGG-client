import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchCurrentUser,
  setUser,
  logout,
  clearError,
  setError,
  setLoading,
} from "@/store/userSlice";
import userService from "@/api/services/userService";
import { LoginRequest } from "@/api/types";

/**
 * הוק שמספק גישה נוחה לפונקציונליות האותנטיקציה
 *
 * שימושים עיקריים:
 * 1. גישה למצב הנוכחי של המשתמש המחובר
 * 2. התנתקות מהמערכת
 * 3. בדיקת תוקף הטוקן
 */
const useUser = () => {
  const dispatch = useAppDispatch();

  // נתוני האותנטיקציה מהסטור
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  // פונקציה להתנתקות
  const logoutUser = () => {
    dispatch(logout());
  };

  // פונקציה לבדיקת תוקף הטוקן ורענון נתוני המשתמש
  const checkAuth = async () => {
    return dispatch(fetchCurrentUser()).unwrap();
  };

  // פונקציה לניקוי שגיאות
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // מצב
    user,
    isAuthenticated,
    loading,
    error,

    // פעולות
    logout: logoutUser,
    checkAuth,
    clearError: clearAuthError,
  };
};

/**
 * הוק לשימוש בקומפוננטת ההתחברות
 * מבצע את הלוגיקה של ההתחברות ועדכון הסטור
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  // פונקציה לביצוע ההתחברות
  const login = async (credentials: LoginRequest) => {
    try {
      // מסמן שיש טעינה ומנקה שגיאות קודמות
      dispatch(setLoading(true));
      dispatch(clearError());

      // ביצוע הקריאה להתחברות בAPI
      const response = await userService.login(credentials);

      if (response.success) {
        // שמירת הטוקן באחסון המקומי
        localStorage.setItem("token", response.data.token);

        // בדיקה אם התקבלו נתוני משתמש בתשובה
        if (response.data.user) {
          dispatch(setUser(response.data.user));
          return response.data.user;
        } else {
          // אם לא, מביאים את נתוני המשתמש בקריאה נפרדת
          const userResponse = await userService.getConnectedUser();
          if (userResponse.success) {
            dispatch(setUser(userResponse.data));
            return userResponse.data;
          } else {
            throw new Error("Failed to get user details");
          }
        }
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      // עיבוד השגיאה
      const errorObj = error?.response?.data || {
        success: false,
        status: "fail",
        message: error.message || "Login failed",
      };

      // הגדרת השגיאה בסטור
      dispatch(setError(errorObj));
      throw error;
    } finally {
      // בכל מקרה, מסיימים את הטעינה
      dispatch(setLoading(false));
    }
  };

  return { login, loading };
};

/**
 * הוק שבודק אוטומטית אם המשתמש מחובר
 * שימושי ב-_app.tsx או ברכיב Layout עליון כדי לבדוק התחברות בעת טעינת האפליקציה
 */
export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // בדוק אם יש טוקן
    const token = localStorage.getItem("token");

    if (token) {
      // אם יש טוקן, בדוק שהוא תקף ע"י שליפת פרטי המשתמש
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return useAppSelector((state) => state.auth);
};

/**
 * הוק שבודק אם דף דורש התחברות
 * שימושי ליצירת HOC עבור דפים מוגנים
 */
export const useRequireAuth = (redirectUrl = "/login") => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // אם סיימנו לבדוק והמשתמש לא מחובר, נעביר אותו לדף ההתחברות
    if (!loading && !isAuthenticated && typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  }, [isAuthenticated, loading, redirectUrl]);

  return { isAuthenticated, loading };
};

export default useUser;
