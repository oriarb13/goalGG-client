import { cn } from "@/lib/utils";
import { Button } from "@/ui/shadCN/button";
import { Calendar } from "lucide-react";

interface EventsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventsDrawer({ isOpen, onClose }: EventsDrawerProps) {
  return (
    <div
      className={cn(
        "fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-80 bg-background border-l transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Events</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Calendar className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        {/* Events content will go here */}
        <p className="text-muted-foreground">No events to display</p>
      </div>
    </div>
  );
}
