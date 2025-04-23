import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/ui/shadCN/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadCN/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { setLanguage } from "@/store/languageSlice";
import { RootState } from "@/store/index";
import { cn } from "@/lib/utils";

interface LanguageSelectMenuProps {
  isMobile?: boolean;
}

const languages = [
  { code: "en", label: "English" },
  { code: "he", label: "עברית" },
  { code: "ar", label: "العربية" },
];

export const LanguageSelectMenu = ({
  isMobile = false,
}: LanguageSelectMenuProps) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem("language", langCode);
    dispatch(setLanguage(langCode));
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? lang.label : languages[0].label;
  };
  console.log("currentLanguage", currentLanguage);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2",
            isMobile && "justify-start w-full"
          )}
        >
          <Globe size={18} />
          <span>{getCurrentLanguageLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isMobile ? "start" : "end"}
        className="min-w-[120px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "cursor-pointer",
              currentLanguage === language.code && "bg-accent"
            )}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelectMenu;
