import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { store } from "@/store/index";
import i18n from "@/lib/i18n";
import { Toaster } from "@/ui/notifications/Toaster";
import { MainLayout } from "@/ui/layouts/MainLayout";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {<MainLayout>{children}</MainLayout>}
          <Toaster />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}
