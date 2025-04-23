import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { store } from "@/store/index";
import i18n from "@/lib/i18n";
import { Toaster } from "@/ui/notifications/Toaster";
import { MainLayout } from "@/ui/layouts/MainLayout";
import { setLanguage } from "@/store/languageSlice";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  useEffect(() => {
    // Only run on client side
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      store.dispatch(setLanguage(savedLanguage));
    }
  }, []);

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
