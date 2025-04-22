import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import { store } from '@/store';
import i18n from '@/lib/i18n';
import { Toaster } from '@/components/ui/toaster';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme="light" storageKey="goal-gg-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}