import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ReactNode } from 'react';
import en from '@/assets/languages/en.json';
import he from '@/assets/languages/he.json';
import ar from '@/assets/languages/ar.json';
import sp from '@/assets/languages/sp.json';

export const defaultLang = 'he';
export const fallbackLang = 'en';
export const supportedLanguages = ['en', 'he', 'ar', 'sp'];

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
      ar: { translation: ar },
      sp: { translation: sp },
    },
    lng: defaultLang,
    fallbackLng: fallbackLang,
    interpolation: {
      escapeValue: false,
    },
  });

export function changeLanguage(lang: string) {
  if (supportedLanguages.includes(lang)) {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    // document.documentElement.dir = ['he', 'ar'].includes(lang) ? 'rtl' : 'ltr';
  }
}

// בדיקה אם יש שפה שמורה בלוקאל סטורג'
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    changeLanguage(savedLanguage);
  }
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  return children;
}

export default i18n;