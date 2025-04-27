import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import { store } from "@/store/store";
import i18n from "@/lib/i18n";
import { Toaster } from "@/ui/notifications/Toaster";
import { MainLayout } from "@/ui/layouts/MainLayout";
import { setLanguage } from "@/store/languageSlice";
import {
  fetchCurrentUser,
  setAuthenticating,
  checkAuthentication,
  logout,
} from "@/store/userSlice";
import { showSnackBar } from "@/store/snackBarSlice";
import { useRouter } from "next/router";
import QueryProvider from "./QueryProvider";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/about"];

// Props interface for AppProvider
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const router = useRouter();
  const { t } = useTranslation();

  // Handle initial app setup and authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Restore saved language preference
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        store.dispatch(setLanguage(savedLanguage));
      }

      // Check for existing authentication token
      const token = localStorage.getItem("token");

      if (token) {
        // Fetch current user if token exists
        store.dispatch(fetchCurrentUser({ router, showAuthError: false }));
      } else {
        // Set authenticating to false and redirect if on a protected route
        store.dispatch(setAuthenticating(false));
        if (!publicRoutes.includes(router.pathname)) {
          router.push("/");
        }
      }
    }
  }, [router, router.pathname]);

  // Intercept fetch requests to handle authentication errors
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async function (input, init) {
      const response = await originalFetch(input, init);

      // Create a clone of the response to read its status
      const clonedResponse = response.clone();

      // Check if there's an authentication error
      if (clonedResponse.status === 401) {
        // Clear token and user state
        localStorage.removeItem("token");

        // Show snackbar notification about session expiration
        store.dispatch(
          showSnackBar({
            message: t("snackbar.sessionExpired"),
            severity: "error",
            show: true,
          })
        );

        // Logout the user from Redux
        store.dispatch(logout());

        // Always redirect to home if not already there
        if (!publicRoutes.includes(router.pathname)) {
          router.push("/");
        }
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [router, t]);

  // Protected route check that runs on each route change
  useEffect(() => {
    const handleRouteChange = () => {
      const token = localStorage.getItem("token");

      // Always verify authentication on route change
      store.dispatch(checkAuthentication());

      // Redirect if on protected route with no token
      if (!token && !publicRoutes.includes(router.pathname)) {
        router.push("/");

        // Show notification that user needs to login
        store.dispatch(
          showSnackBar({
            message: t("snackbar.loginRequired"),
            severity: "error",
            show: true,
          })
        );
      }
    };

    // Check when component mounts
    handleRouteChange();

    // Check on each route change
    router.events.on("routeChangeComplete", handleRouteChange);

    // Also detect token changes
    const tokenCheckInterval = setInterval(() => {
      const token = localStorage.getItem("token");
      const { user } = store.getState().user;

      // If we have a user in state but no token, we need to redirect
      if (!token && user && !publicRoutes.includes(router.pathname)) {
        router.push("/");

        // Show notification about session expiration
        store.dispatch(
          showSnackBar({
            message: t("snackbar.sessionExpired"),
            severity: "error",
            show: true,
          })
        );

        store.dispatch(logout());
      }
    }, 5000);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      clearInterval(tokenCheckInterval);
    };
  }, [router, t]);

  return (
    <QueryProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </QueryProvider>
  );
}
