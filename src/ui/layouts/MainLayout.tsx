import { ReactNode, useState } from "react";
import { EventsDrawer } from "../shared/EventsDrawer";
import { cn } from "@/lib/utils";
import { MainMenu } from "../shared/menu/MainMenu";
import Image from "next/image";
import fieldBgImage from "@/assets/images/field-bg.png";
import { GlobalSnackBar } from "../shared/snackbar";
import { useAppSelector } from "@/store/store";
import BallLoader from "@/assets/animations/ballLoader/BallLoader";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isEventsDrawerOpen, setIsEventsDrawerOpen] = useState(false);
  const { loading, isAuthenticating } = useAppSelector((state) => state.user);
  
  const showLoader = loading || isAuthenticating;

  return (
    <div className="h-screen w-full max-h-screen bg-background relative overflow-y-hidden">
      {showLoader && (
        <div className="fixed bottom-60 left-0 right-0 flex items-center justify-center z-50 h-16">
          <BallLoader />
        </div>
      )}

      <Image
        src={fieldBgImage}
        alt="Background"
        fill
        priority
        quality={100}
        className="absolute inset-0 object-cover z-0"
      />

      <MainMenu />

      {!showLoader && (
        <>
          <GlobalSnackBar />
          <EventsDrawer
            isOpen={isEventsDrawerOpen}
            onClose={() => setIsEventsDrawerOpen(false)}
          />
          <main className={cn("pt-16", isEventsDrawerOpen && "pr-80")}>
            {children}
          </main>
        </>
      )}
    </div>
  );
}