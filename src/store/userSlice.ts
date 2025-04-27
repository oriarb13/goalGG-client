import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "@/api/services/userService";
import { User } from "@/types/types";
import { showSnackBar } from "@/store/snackBarSlice";

// מבנה השגיאות מהשרת
interface APIError {
  success: boolean;
  status: string;
  message: string;
  stack?: string;
}

// מבנה מצב המשתמש ברידקס
interface UserState {
  user: User | null;
  loading: boolean;
  error: APIError | null;
}

// מצב התחלתי
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// פונקציית עזר לטיפול בשגיאות
const handleApiError = (error: any): APIError => {
  if (error?.response?.data && !error.response.data.success) {
    return {
      success: false,
      status: error.response.data.status || "fail",
      message: error.response.data.message || "שגיאת שרת",
      stack: error.response.data.stack,
    };
  }

  if (typeof error === "string") {
    return {
      success: false,
      status: "fail",
      message: error,
    };
  }

  return {
    success: false,
    status: "error",
    message: error?.message || "אירעה שגיאה לא ידועה",
  };
};

// פונקציה אחת שמטפלת בהבאת המשתמש ועדכון הסטייט
export const fetchCurrentUser = createAsyncThunk<
  User,
  { router?: any; showAuthError?: boolean } | undefined, // הוספת אפשרות להצגת הודעת שגיאה
  { rejectValue: APIError; dispatch: any }
>("user/fetchCurrentUser", async (params, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem("token");

    // auth
    if (!token) {
      if (
        params?.router &&
        params.router.pathname !== "/" &&
        params.router.pathname !== "/about"
      ) {
        params.router.push("/");
      }
      localStorage.removeItem("token");

      // שימוש ב-dispatch שמועבר על ידי redux-thunk
      if (params?.showAuthError !== false) {
        dispatch(
          showSnackBar({
            message: "עליך להתחבר למערכת",
            severity: "error",
            show: true,
          })
        );
      }

      return rejectWithValue({
        success: false,
        status: "fail",
        message: "אין טוקן אימות",
      });
    }

    // get user
    const response = await userService.getConnectedUser();

    if (response.success) {
      return response.data;
    }

    localStorage.removeItem("token");
    if (
      params?.router &&
      params.router.pathname !== "/" &&
      params.router.pathname !== "/about"
    ) {
      params.router.push("/");
    }

    // הצגת הודעת שגיאה אם נדרש
    if (params?.showAuthError !== false) {
      dispatch(
        showSnackBar({
          message: "ההתחברות נכשלה, נא להתחבר מחדש",
          severity: "error",
          show: true,
        })
      );
    }

    return rejectWithValue({
      success: false,
      status: "fail",
      message: "נכשל בהבאת נתוני המשתמש",
    });
  } catch (error: any) {
    // אם יש שגיאה, נתק את המשתמש ונתב לעמוד הבית
    localStorage.removeItem("token");
    if (
      params?.router &&
      params.router.pathname !== "/" &&
      params.router.pathname !== "/about"
    ) {
      params.router.push("/");
    }

    // הצגת הודעת שגיאה אם נדרש
    if (params?.showAuthError !== false) {
      dispatch(
        showSnackBar({
          message: "ההתחברות נכשלה, נא להתחבר מחדש",
          severity: "error",
          show: true,
        })
      );
    }

    return rejectWithValue(handleApiError(error));
  }
});

// פונקציית התנתקות
export const logoutUser = createAsyncThunk<
  void,
  { router?: any; showMessage?: boolean } | undefined,
  { dispatch: any }
>("user/logoutUser", async (params, { dispatch }) => {
  // מחק את הטוקן
  localStorage.removeItem("token");

  // הצג הודעת התנתקות אם נדרש
  if (params?.showMessage !== false) {
    dispatch(
      showSnackBar({
        message: "התנתקת מהמערכת בהצלחה",
        severity: "success",
        show: true,
      })
    );
  }

  // נתב לעמוד הבית אם לא נמצאים בעמוד ציבורי וקיים ראוטר
  if (
    params?.router &&
    params.router.pathname !== "/" &&
    params.router.pathname !== "/about"
  ) {
    params.router.push("/");
  }
});

// סלייס המשתמש
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // הגדרת המשתמש במצב
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },

    // התנתקות מהמערכת
    logout: (state) => {
      state.user = null;
    },

    // ניקוי שגיאות
    clearError: (state) => {
      state.error = null;
    },

    // הגדרת שגיאה
    setError: (state, action: PayloadAction<APIError>) => {
      state.error = action.payload;
    },

    // הגדרת מצב טעינה
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // טיפול במצבי fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || {
          success: false,
          status: "error",
          message: "האימות נכשל",
        };
      })
      // טיפול בהתנתקות
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

// ייצוא פעולות
export const { setUser, logout, clearError, setError, setLoading } =
  userSlice.actions;

// ייצוא הרדיוסר
export default userSlice.reducer;
