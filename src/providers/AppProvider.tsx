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
// רשימת הנתיבים הציבוריים שלא דורשים הרשאה
const publicRoutes = ["/", "/about"];

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const router = useRouter();

  useEffect(() => {
    // פועל רק בצד הלקוח
    if (typeof window !== "undefined") {
      // טעינת הגדרות שפה
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        store.dispatch(setLanguage(savedLanguage));
      }

      // בדיקה אם המשתמש מחובר ועדכון הסטייט ברידקס
      const token = localStorage.getItem("token");

      if (token) {
        // יש טוקן - ננסה לקבל את המשתמש
        store.dispatch(fetchCurrentUser({ router }));
      } else if (!publicRoutes.includes(router.pathname)) {
        // אין טוקן והדף לא ציבורי - ננתב לעמוד הבית
        router.push("/");
      }
    }
  }, [router, router.pathname]);

  // הוספנו כאן בדיקה שתבדוק אם המשתמש משנה נתיב לדף מוגן
  useEffect(() => {
    const handleRouteChange = () => {
      const token = localStorage.getItem("token");

      // אם מנסים לגשת לדף מוגן בלי טוקן, ננתב לעמוד הבית
      if (!token && !publicRoutes.includes(router.pathname)) {
        router.push("/");
      }
    };

    // מאזין לאירועי שינוי נתיב
    router.events.on("routeChangeComplete", handleRouteChange);

    // ניקוי המאזין כשהקומפוננטה מתפרקת
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
