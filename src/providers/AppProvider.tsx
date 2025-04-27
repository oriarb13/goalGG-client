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
import QueryProvider from "./QueryProvider";
const publicRoutes = ["/", "/about"];
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        store.dispatch(setLanguage(savedLanguage));
      }

      const token = localStorage.getItem("token");

      if (token) {
        store.dispatch(fetchCurrentUser({ router }));
      } else if (!publicRoutes.includes(router.pathname)) {
        router.push("/");
      }
    }
  }, [router, router.pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      const token = localStorage.getItem("token");

      if (!token && !publicRoutes.includes(router.pathname)) {
        router.push("/");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

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
