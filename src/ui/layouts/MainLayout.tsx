import { ReactNode, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/store/slices/languageSlice';
import { Navbar } from '@/components/shared/Navbar';
import { Sidebar } from '@/components/shared/Sidebar';
import { MobileMenu } from '@/components/shared/MobileMenu';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar 
        user={user} 
        isAuthenticated={isAuthenticated} 
        currentLanguage={currentLanguage}
        onChangeLanguage={changeLanguage}
      />
      
      <div className="flex flex-1">
        {/* שייט לתצוגה במובייל */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
        
        {/* סיידבר לתצוגות גדולות */}
        <aside className="hidden lg:block w-64 shrink-0 border-l">
          <Sidebar />
        </aside>
        
        {/* תוכן ראשי */}
        <main className="flex-1">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}