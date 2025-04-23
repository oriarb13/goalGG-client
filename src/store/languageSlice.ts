import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeLanguage, defaultLang } from '@/lib/i18n';

interface LanguageState {
  currentLanguage: string;
}

// קבלת השפה הנוכחית מהדפדפן או מהאחסון המקומי
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || defaultLang;
  }
  return defaultLang;
};

const initialState: LanguageState = {
  currentLanguage: getSavedLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const lang = action.payload;
      state.currentLanguage = lang;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
        changeLanguage(lang);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;