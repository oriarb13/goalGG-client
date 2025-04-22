import { GlobeIcon } from "@/assets/icons/menu/globe";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@/store/slices/languageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

function LanguageSelectMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentLanguage } = useAppSelector((state) => state.language);

  const languages = [
    {
      label: "English",
      tag: "en",
    },
    {
      label: "Español",
      tag: "sp",
    },
    {
      label: "עברית",
      tag: "he",
    },
    {
      label: "العربية",
      tag: "ar",
    },
  ];

  const handleLanguageChange = (value: string) => {
    dispatch(setLanguage(value));
  };

  // מוצא את השפה הנוכחית להצגה
  const currentLanguageLabel =
    languages.find((lang) => lang.tag === currentLanguage)?.label || "English";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("common.changeLanguage")}
        >
          <GlobeIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuRadioGroup
          value={currentLanguage}
          onValueChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.tag} value={lang.tag}>
              {lang.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelectMenu;
