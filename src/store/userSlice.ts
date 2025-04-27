import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "@/api/services/userService";
import { User } from "@/types/types";
import { showSnackBar } from "@/store/snackBarSlice";

interface APIError {
  success: boolean;
  status: string;
  message: string;
  stack?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: APIError | null;
  isAuthenticating: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticating: true,
};

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

export const fetchCurrentUser = createAsyncThunk<
  User,
  { router?: any; showAuthError?: boolean } | undefined,
  { rejectValue: APIError; dispatch: any }
>("user/fetchCurrentUser", async (params, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      if (
        params?.router &&
        params.router.pathname !== "/" &&
        params.router.pathname !== "/about"
      ) {
        params.router.push("/");
      }
      localStorage.removeItem("token");

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
    localStorage.removeItem("token");
    if (
      params?.router &&
      params.router.pathname !== "/" &&
      params.router.pathname !== "/about"
    ) {
      params.router.push("/");
    }

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

export const logoutUser = createAsyncThunk<
  void,
  { router?: any; showMessage?: boolean } | undefined,
  { dispatch: any }
>("user/logoutUser", async (params, { dispatch }) => {
  localStorage.removeItem("token");

  if (params?.showMessage !== false) {
    dispatch(
      showSnackBar({
        message: "התנתקת מהמערכת בהצלחה",
        severity: "success",
        show: true,
      })
    );
  }

  if (
    params?.router &&
    params.router.pathname !== "/" &&
    params.router.pathname !== "/about"
  ) {
    params.router.push("/");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticating = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticating = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    setError: (state, action: PayloadAction<APIError>) => {
      state.error = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticating = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticating = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || {
          success: false,
          status: "error",
          message: "האימות נכשל",
        };
        state.isAuthenticating = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticating = false;
      });
  },
});

export const {
  setUser,
  logout,
  clearError,
  setError,
  setLoading,
  setAuthenticating,
} = userSlice.actions;

export default userSlice.reducer;
