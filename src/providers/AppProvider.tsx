import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { store } from "@/store/store";
import i18n from "@/lib/i18n";
import { Toaster } from "@/ui/notifications/Toaster";
import { MainLayout } from "@/ui/layouts/MainLayout";
import { setLanguage } from "@/store/languageSlice";
import { fetchCurrentUser } from "@/store/userSlice";
import { useRouter } from "next/router";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const router = useRouter(); // העברת useRouter לתוך הקומפוננטה

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Load language settings
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        store.dispatch(setLanguage(savedLanguage));
      }

      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        store.dispatch(fetchCurrentUser());
      } else if (router.pathname !== "/" && router.pathname !== "/about") {
        router.push("/");
      }
    }
  }, [router]); // הוספת router כתלות

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}
