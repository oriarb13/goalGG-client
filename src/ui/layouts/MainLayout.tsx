import { ReactNode, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EventsDrawer } from "../shared/EventsDrawer";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isEventsDrawerOpen, setIsEventsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen bg-background">
      <EventsDrawer
        isOpen={isEventsDrawerOpen}
        onClose={() => setIsEventsDrawerOpen(false)}
      />
      <main
        className={cn(
          "pt-16",
          isMobile ? "pl-0" : "pl-64",
          isEventsDrawerOpen && "pr-80"
        )}
      >
        {children}
      </main>
    </div>
  );
}
